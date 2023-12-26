const Array50 = ["","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
function encode(num) {
    const nums = Array.from(String(num))
    console.log(num)
    console.log(nums)
    let output = []
    let i=0
    while (i<nums.length) {
        let gettedNums = nums.slice(i,i+4).join("")
        console.log(gettedNums)
        if (gettedNums[0] == 0) {
            let j=0
            while (nums[i+j]=='0') {
                j++
            }
            i+=j
            output.push('A'+j)
            console.log('A'+j)
        } else {
            let encodedString = ""
            if (gettedNums<2500) {
                encodedString += "A"
                if (gettedNums<50) {
                    encodedString += "A"
                    encodedString += Array50[gettedNums] 
                } else {
                    encodedString += Array50[Math.floor(gettedNums/50)]
                    encodedString += Array50[gettedNums%50]
                }
            } else {
                encodedString += Array50[Math.floor(gettedNums/2500)]
                gettedNums -= Math.floor(gettedNums/2500)*2500
                console.log(gettedNums)
                if (gettedNums<50) {
                    encodedString += "A"
                    encodedString += Array50[gettedNums] 
                } else {
                    encodedString += Array50[Math.floor(gettedNums/50)]
                    encodedString += Array50[gettedNums%50]
                }
            }
            output.push(encodedString)
            console.log(encodedString)
            i+=4
        }
    }
    return output.join('a')
}
function decode(arr) {
    arr = String(arr).split('a')
    console.log(arr)
    let output = []
    const multiplyBy = {0:2500,1:50,2:1}
    for (let decodes of arr) {
        console.log(String(decodes)[0] == 'A'&&!isNaN(Number(String(decodes)[1])))
        if (String(decodes)[0] == 'A'&&!isNaN(Number(String(decodes)[1]))) {
            let i=0
            let Zeros = ''
            let number = Number(arr[arr.indexOf(decodes)].substring(1))
            
            console.log(number)
            while (i<number) {
                Zeros += '0'
                i++
            }
            console.log(Zeros)
            output.push(Zeros)
        } else {
            let num = 0
            console.log(decodes)
            let i = 0
            for (let letter of decodes ) {
                console.log(letter)
                if (letter!="A") {
                    num += Array50.indexOf(letter)*multiplyBy[i]
                    console.log(num)
                }
                i++
            }
            output.push(num)
        }
    }
    return output.join('')
}
console.log(encode(485649))
console.log('output: '+decode(encode('00012')))