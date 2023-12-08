       function funcion1() {

        function toRadians(degrees) {
            return degrees * Math.PI / 180;
            }
            
            var canvas1 = document.getElementById("myCanvas1");
            var renderer = new THREE.WebGLRenderer({canvas: canvas1});
            renderer.setClearColor(0x000000);
            renderer.shadowMap.enabled = true; // Habilitar el renderizado de sombras
            renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra suave

            var scene = new THREE.Scene();

            var camera = new THREE.PerspectiveCamera(45, canvas1.width / canvas1.height, 1, 1000);
            camera.position.set(0, 0, 5);
            scene.add(camera);
            camera.aspect = canvas1.clientWidth / canvas1.clientHeight;
            camera.updateProjectionMatrix();

            // Crear una luz que genere sombras
            var light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(0, 5, 5);
            light.castShadow = true;
            scene.add(light);

            // Configurar la proyección de sombras de la luz
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            light.shadow.camera.near = 0.5;
            light.shadow.camera.far = 50;
            
            // Crear una textura combinada que contiene las imágenes recortadas
            var combinedTexture = new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD6SURBVEhL3VVBDoIwENwKj8GTiST+Rz6A7+AkL/AdfsEErvIYDMruTGMagwQOEOYy1e22u5Pp4uQ/OvBUDN4xqoAPdJE2tr0qlMTdjBl/4bhToyT1Xmnwjh14MYxS4Pi0RX23TruLpTGZ8co67iVRck53bEAB78KzkTvgHyhBD0iG4+AN/NqAAuCpGLyjD869YBa0gBYlxKUt2tyKjlE7K0wDt7M1voJHYhwhwDjPj3CSK5XUQ6vwgFfgV4U9/DtPsBFu5yT0cUzI4BWIXC2PykaZkuavQ4Fwln9XqAg6oFf8HMB8YOf0Cr4FPs750eVKOinXoYAtl4DIG1EDVRJkE/K7AAAAAElFTkSuQmCC");

            let Images = [[],[],[]]
            var canvas = null
            function aTexture(){
            canvas = document.createElement( 'CANVAS' );
            canvas.width = 512;
            canvas.height = 512;


            // procedurally drawing border and two crossed lines

            var context = canvas.getContext( '2d' );
                context.fillStyle = 'tan';
                context.fillRect( 0, 0, 512, 512 );
                context.strokeStyle = 'black';
                context.lineWidth = 32;
                context.strokeRect( 16, 16, 512-32, 512-32 );
                context.beginPath( );
                context.moveTo( 0, 0 );
                context.lineTo( 512, 512 );
                context.moveTo( 0, 512 );
                context.lineTo( 512, 0 );
                context.stroke( );
                Images.push(canvas)
            }
              
            function recortarTexturas() {
                // Obtener el contexto del canvas
                var canvas = document.getElementById("minecraftCanvas");
                var ctx = canvas.getContext("2d");

                // Crear una nueva imagen
                var img = new Image();

                // Establecer la ruta de la imagen
                img.src = 'cabeza_minecraft.png';

                // Esperar a que la imagen se cargue
                img.onload = function() {
                    img.setAttribute("cross-origin","use-credentials")
                    // Dibujar la imagen en el canvas
                    ctx.drawImage(img, 0, 0, 32, 16);
                    // Llamar a la función para recortar la imagen
                    recortarImagen(1,0);
                };
  
                // Función para recortar la imagen en partes de 8x8
                function recortarImagen(i,j) {
                    // Crear un nuevo canvas para cada parte
                    Images[i][j] = document.createElement("CANVAS");
                    Images[i][j].width = 8;
                    Images[i][j].height = 8;
                    Images[i][j].setAttribute("cross-origin","use-credentials")
                     var nuevoCtx = Images[i][j].getContext("2d");

                    // Copiar la porción de la imagen al nuevo canvas
                    nuevoCtx.drawImage(canvas, j * 8, i * 8, 8, 8, 0, 0, 8, 8);
                    const id = "("+j+","+i+")"
                    Images[i][j].id = id
      
                    // Agregar el nuevo canvas a la página o realizar cualquier acción deseada
                    document.body.appendChild(Images[i][j]);
                }
                };
            recortarTexturas();
            aTexture();

            var cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ), [
                new THREE.MeshLambertMaterial( {color: 'lightgray'}),
                new THREE.MeshLambertMaterial( {color: 'lightgray'}),
                new THREE.MeshLambertMaterial( {map: new THREE.CanvasTexture(Images[1][0])} ),
                new THREE.MeshLambertMaterial( {color: 'lightgray'}),
                new THREE.MeshLambertMaterial( {color: 'lightgray'}),
                new THREE.MeshLambertMaterial( {color: 'lightgray'}),
          ]);	
            cube.castShadow = true; // Permitir que el objeto genere sombras
            cube.position.set(0, 0, 0); // Ajustar la posición del cubo
            scene.add(cube);
            
            // Definir variables globales para almacenar el estado del mouse.
            var isDragging1 = false;
            var previousMousePosition = {
                x: 0,
                y: 0
            };

            // Escuchar eventos de mouse en el canvas1 para mover el cubo.
            canvas1.addEventListener("mousedown", function (event1) {
                isDragging1 = true;
                });
            canvas1.addEventListener("mouseup", function (event1) {
                isDragging1 = false;
                });
            canvas1.addEventListener("mousemove", function (event1) {
            var deltaMove1 = {
            x: event1.offsetX - previousMousePosition.x,
            y: event1.offsetY - previousMousePosition.y
            };
            if (isDragging1) {
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                toRadians(deltaMove1.y * 1),
                toRadians(deltaMove1.x * 1),
                0,
                'XYZ'
                ));
            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
            }
                previousMousePosition = {
            x: event1.offsetX,
            y: event1.offsetY
    };
});

            var animate = function () {
                requestAnimationFrame(animate);

                //cube.rotation.x += 0.01;
                //cube.rotation.y += 0.01;

                renderer.render(scene, camera);
            };

            animate();
           
       }
