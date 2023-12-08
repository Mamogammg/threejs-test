        function funcion2() {

        function toRadians(degrees) {
            return degrees * Math.PI / 180;
            }
            
            var canvas2 = document.getElementById("myCanvas2");
            var renderer = new THREE.WebGLRenderer({canvas: canvas2});
            renderer.setClearColor(0x000000);
            renderer.shadowMap.enabled = true; // Habilitar el renderizado de sombras
            renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra suave

            var scene = new THREE.Scene();

            var camera = new THREE.PerspectiveCamera(45, canvas2.width / canvas2.height, 1, 1000);
            camera.position.set(0, 0, 5);
            scene.add(camera);
            camera.aspect = canvas2.clientWidth / canvas2.clientHeight;
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
            
            // La creación del cubo 
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshStandardMaterial({color: 0xed4e4e});
            
            //Usar material de sombras
            var cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true; // Permitir que el objeto genere sombras
            cube.position.set(0, 0, 0); // Ajustar la posición del cubo
            scene.add(cube);
            
            // Definir variables globales para almacenar el estado del mouse.
            var isDragging2 = false;
            var previousMousePosition = {
                x: 0,
                y: 0
            };

            // Escuchar eventos de mouse en el canvas2 para mover el cubo.
            canvas2.addEventListener("mousedown", function (event2) {
                isDragging2 = true;
                });
            canvas2.addEventListener("mouseup", function (event2) {
                isDragging2 = false;
                });
            canvas2.addEventListener("mousemove", function (event2) {
            var deltaMove2 = {
            x: event2.offsetX - previousMousePosition.x,
            y: event2.offsetY - previousMousePosition.y
            };
            if (isDragging2) {
                var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                toRadians(deltaMove2.y * 1),
                toRadians(deltaMove2.x * 1),
                0,
                'XYZ'
                ));
            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
            }
                previousMousePosition = {
            x: event2.offsetX,
            y: event2.offsetY
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