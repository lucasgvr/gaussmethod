const container = document.getElementById("container")

function addFields(){
    var cols = document.getElementById("cols").value
    var rows = cols
    cols++

    container.style.setProperty('display', 'grid')
    container.style.setProperty('grid-template-rows', `repeat(${rows}, 1fr)`)
    container.style.setProperty('grid-template-columns', `repeat(${cols}, 1fr)`)

    for (i = 0; i < (rows * cols); i++) { 
        var cell = document.createElement("input")
        cell.type = "number"
        cell.placeholder = "Número: " + i
        cell.id = 'input' + i
        container.appendChild(cell).className = "grid-item"
    } 
}

function getFields() {
    var arrayA = []
    var arrayB = []
    var arrayT = []

    var numCol = document.getElementById("cols").value
    numCol = parseInt(numCol)
    
    document.querySelectorAll('[id^="input"]').forEach(function(input) {
        nome = input.value
        arrayA.push(nome)
    })

    for(i = 0; i < arrayA.length; i = i + (numCol + 1)) {
        arrayT = arrayA.slice(i, i + numCol + 1)
        arrayB.push(arrayT)
    } 

    calculateMatrix(arrayB)
}
        
function generatedResult(matriz, matrizPermuta, m, matrizU) {
    var cols = document.getElementById("cols").value
    var rows = cols
    cols++
    
    var cellResult
    var resultValue
    for(var l = 0; l < rows; l++) {        
        for (var c = 0; c < cols; c++) {
            cellResult = document.createElement("div")
            cellResult.disabled
            cellResult.type = "number"
            resultValue = matriz[l][c]
            cellResult.innerText= (resultValue)
        }
    }

    var identidade = ''
    var mU = ''
    var mM = ''
    var resultPermut
    var resultM
    var resultU

    cols--

    for(var l = 0; l < rows; l++) {       
        for (var c = 0; c < cols; c++) {
            resultPermut = matrizPermuta[l][c]
            resultM = m[l][c]
            resultU = matrizU[l][c]

            identidade += resultPermut
            identidade += "<td>" + "&nbsp" + "&nbsp"
            document.getElementById('output2').innerHTML = identidade

            mM += resultM
            mM += "<td>" + "&nbsp" + "&nbsp"
            document.getElementById('output3').innerHTML = mM

            mU += resultU
            mU += "<td>" + "&nbsp" + "&nbsp"
            document.getElementById('output4').innerHTML = mU
        }

        identidade += "<br>"
        mM += "<br>"
        mU += "<br>"
    }
}
    
function calculateMatrix(arrayB) {
    var valor = arrayB

    var i = document.getElementById("cols").value
    i = parseInt(i)
    j = i 
    i = i-1 

    var x = []
    var m =[]
    var matrizU =[]
    var matrizP = []
    var arrayA = []
    var arrayT = []

    for(v = 0; v < j * j; v++) {
        arrayA.push(0)
    }

    for(v = 0; v < j * j; v = v + j) {
        arrayT = arrayA.slice(v, v + j)
        m.push(arrayT)
    }

    for(v = 0; v < j * j; v = v + j) {
        arrayT = arrayA.slice(v, v + j)
        matrizP.push(arrayT)
    }

    for(v = 0; v < j * j; v = v + j) {
        arrayT = arrayA.slice(v, v + j)
        matrizU.push(arrayT)
    }

    for(var l = 0; l < j; l++) {
        for(var k = 0; k < j; k++) {
            if(l == k) {
                matrizP[l][k] = 1
                matrizU[l][k] = 1
            } else {
                matrizP[l][k] = 0
                matrizU[l][k] = 0
            }
        } 
    }

    for(l = 0; l < i + 1; l++) {
        if(valor[l][0] == 0) {
            var troca = valor[1]
            valor[1] = valor[l]
            valor[l] = troca
            mT = matrizP[1]
            matrizP[1] = matrizP[l]
            matrizP[l] = mT
            break
        }
    }

    for(var l = 0; l < i; l++) {
        pivo = valor[l][l]

        for(var o = l + 1; o < i + 1; o++) {
            m[o][l] = valor[o][l]/pivo
            
            var a = 0

            for(var k = 0; k < j; k++) { 
                if(valor[o][k]==0) {
                
                } else {
                    for(var k = 0; k < j + 1; k++) { 
                        val = (valor[o][k]) - (m[o][l] * valor[l][k])
                        valor[o][k] = val.toFixed(3)
                    }
                }
            } 
        }

        for(var t = 0; t < j; t++) {
            for(var k = 0; k < j; k++) { 
                matrizU[t][k] = valor[t][k]
            }
        }
        
        for(var o = l + 1; o < i + 1; o++) {
            for(var k = 0; k < j; k++) { 
                if(valor[o][k]!= 0) {
                    break
                } else {
                    a++
                }
            }
            if(a > o) {
                var trocaA = valor[a]
                valor[a] = valor[o]
                valor[o] = trocaA

                var trocaU = matrizU[a]
                matrizU[a] = matrizU[o]
                matrizU[o] = trocaU

                var trocaL = m[a]
                m[a] = m[o]
                m[o] = trocaL

                mP = matrizP[a]
                matrizP[a] = matrizP[o]
                matrizP[o] = mP
                l++

                break
            }
        }
    }
    
    for(var l = 0; l < j; l++) {
        for(var c = 0; c < j; c++) {
            if(l==c){
                m[l][c] = 1
            }
        }
    }

    var matriz = valor
    var matrizPermuta = matrizP

    generatedResult(matriz, matrizPermuta, m, matrizU)

    for(y = i; y > -1; y--) {
        result = valor[y][j] 

        for(m = 0; m < j; m++) { 
            if(m == y) { 
               
            } else {
                result = result - valor[y][m]
            }
        }

        x[y] = result / valor[y][y]  

        for(l = i; l > -1; l--) {
            valor[l][y] = x[y] * valor[l][y]
        }
    } 
    
    var text = ''
    
    for(z = 0;z < j; z++) {
        text += "X" + z + ": "
        text += x[z]
        text += "<br>"
    }
    
    document.getElementById('output').innerHTML = text
}