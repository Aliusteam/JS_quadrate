window.finish = false
var field = -1  // Это сколько квадратов в поле открыть

function func_select(button) {
    document.querySelector('.header9').innerHTML = ''
    document.querySelector('.header16').innerHTML = ''
    document.querySelector('.header25').innerHTML = ''
    // console.log('function func_select')
    window.field = document.getElementById('selecti').selectedIndex
    if (field === 0) {
        field = 9
    } else if (field === 1) {
        field = 9
    } else if (field === 2) {
        field = 16
    } else if (field === 3) {
        field = 25
    }
    // console.log(field)
    pole(field)
}

func_select()

function pole(field) {
    finish = false
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    if (field === 9) {
        canvas.width = 300;
        canvas.height = 300;
        window.arr = [0,1,2,3,4,5,6,7,8];
    } else if  (field === 16) {
        canvas.width = 400;
        canvas.height = 400;
        window.arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    } else if  (field === 25) {
        canvas.width = 500;
        canvas.height = 500;
        window.arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    }

    canvas.style.left = "100px";
    canvas.style.top = "100px";
    canvas.style.position = "absolute";

// получим внутреннюю ширину окна в пикселях
    var width = ctx.innerWidth;
// получим внутреннюю высоту окна в пикселях
    var height = ctx.innerHeight;
    // console.log(width, height)

// const arr = [0,1,2,3,4,5,6,7,8]
// const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
// const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
//     console.log(arr, field)
    window.myArr = arr.map(i => [Math.random(i), i]).sort().map((i) => i[1])
    // console.log(myArr)

    window.coordinates = {} // для сбора коордирнат квадратов
    window.drawSquare = function (x, y, val) {
        // console.log('функция drawSquare')
        ctx.fillStyle = 'black'
        ctx.fillRect(x, y, 100, 100)

        if (val === 0 && finish === false) {
            ctx.fillStyle = 'white'
        } else {
            ctx.fillStyle = 'teal'
        }
        ctx.fillRect(x + 5, y + 5, 90, 90)

        // Координаты квадратов -
        coordinates[(Object.keys(coordinates)).length]=[x/100, y/100]
        ctx.font = '60px Arial'  // 4isla v kvadrat
        ctx.fillStyle = 'white'

        if (val === 0 && finish === true) {
            val = myArr.length
            if (val < 10) {
                ctx.fillText(val, x + 35, y + 70)
            } else{
                ctx.fillText(val, x + 15, y + 70)
            }

        } else { if (val < 10) {
            ctx.fillText(val, x + 35, y + 70)
        } else{
            ctx.fillText(val, x + 15, y + 70)
        }
        }
    }

// drawSquare(200, 200, 14)
    let valTable = field  // Это сколько квадратов будем в игре
    window.sqrtValTable = Math.sqrt(valTable)
    // console.log(sqrtValTable)

    k = 0
    p = 0

    for (let i = 0; i < sqrtValTable*100; i += 100){
        display(myArr, i)
    }
}


function display(arrayDel, k, val = 3) {
    // console.log('функция display')
    for (let i = 0 ; i < sqrtValTable  ; i++) {

        let val  = arrayDel[p]

        // console.log(myArr.length, arr.length)
        if (myArr.length < arr.length) {
            myArr.push(val)
        }
        p += 1
        drawSquare(i * 100, k, val)
    }
}


// console.log(myArr)
func_select()

// Выясняем куда был совершен клик
var checkPlace = function (evX, evY) {
    // console.log('функция checkPlace - Ловим нажатие куда было сделано')
    if (evX < 210) {
        return [0, evY]
    }
    if (evX < 310) {
        return [1, evY]
    }
    if (evX < 410) {
        return [2, evY]
    }
    if (evX < 510) {
        return [3, evY]
    }
    if (evX < 610) {
        return [4, evY]
    }
}

var valueKey = +0  // Нажатие - цифры - поиск ее номера в списке
canvas.addEventListener("click", (event) => {
    // console.log('Нажатие - цифры - поиск ее номера в списке')
    if (event.clientY > 110 && event.clientY < 210) {
        var place = checkPlace(event.clientX, 0)
    }
    else if (event.clientY > 210 && event.clientY < 310) {
        var place = checkPlace(event.clientX, 1)
    }
    else if (event.clientY > 310 && event.clientY < 410) {
        var place = checkPlace(event.clientX, 2)
    }
    else if (event.clientY > 410 && event.clientY < 510) {
        var place = checkPlace(event.clientX, 3)
    }
    else if (event.clientY > 510 && event.clientY < 610) {
        var place = checkPlace(event.clientX, 4)
    }
    for (let key in coordinates) {
        var isEqual = JSON.stringify(place) === JSON.stringify(coordinates[key]);
        if (isEqual) {
            // console.log('valueKey, key', valueKey, key)
            if (key > myArr.length -1) {
                key = 0
            } else {
                valueKey = +key + 1
            }
            console.log(`номер нажатия кнопки: ${valueKey}, цифра на кнопке: ${myArr[valueKey-1]}`)  // Это номер нажатия кнопки
        }
    }

    // console.log(myArr,valueKey,  myArr[valueKey - 1], 111111111111)
    // Если нажимаем на квадрат, который ниже 0 квадрата. То есть снизу от 0 квадтрата
    if (myArr[valueKey - (Math.sqrt(myArr.length) + 1)] === 0) {
        myArr[valueKey - (Math.sqrt(myArr.length) + 1)] = myArr[valueKey - 1]
        myArr[valueKey -1] = 0}

    else if (myArr[valueKey + (Math.sqrt(myArr.length) - 1)] === 0) {
        // console.log('Словили valueKey:', valueKey, 'Значение, равно 0?', myArr[valueKey + (Math.sqrt(myArr.length) + 1)], '!!!!!!!!!!!!!!!!!!!!!!!!')
        myArr[valueKey + (Math.sqrt(myArr.length) - 1)] = myArr[valueKey - 1]
        myArr[valueKey -1] = 0
    }

    // else if (myArr[valueKey - 2] === 0 && Math.ceil((valueKey-1) / Math.sqrt(myArr) ) === Math.ceil((valueKey-2) / Math.sqrt(myArr) ))  {

    else if (myArr[valueKey - 2] === 0 &&
        Math.ceil((valueKey) / Math.sqrt(myArr.length) ) === Math.ceil((valueKey-1) / Math.sqrt(myArr.length) ))  {
        // console.log(Math.ceil((valueKey-1) / Math.sqrt(myArr) ) === Math.ceil((valueKey-2) / Math.sqrt(myArr) ))
        myArr[valueKey - 2] = myArr[valueKey - 1]
        myArr[valueKey - 1] = 0
    }
    else if (myArr[valueKey] === 0 &&
        Math.ceil((valueKey) / Math.sqrt(myArr.length) ) === Math.ceil((valueKey+1) / Math.sqrt(myArr.length) ))  {
        myArr[valueKey] = myArr[valueKey - 1]
        myArr[valueKey - 1] = 0
    }

    // myArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
    // myArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,0]
    // myArr = [1,2,3,4,5,6,7,8,0]

    window.d = 0 // Проверка цифр по порядку
    const chek = myArr.slice(0, (myArr.length - 1)).map(el => (d = d + 1) === el)
    // console.log(chek.includes(false))
    if (chek.includes(false)) {
        window.finish = false
    } else {
        window.finish = true
        console.log(finish)
    }

    // console.log(myArr, myArr[valueKey-(Math.sqrt(myArr.length) + 1)], 22222222222222)
    p = 0
    for (let g = 0; g < sqrtValTable * 100; g += 100) {
        // console.log(`valueKey:${valueKey}`, myArr, g, 333333333333333)
        display(myArr, g)
    }

    // console.log(myArr.length, finish, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    if (myArr.length === 25 && finish === true) {
        document.querySelector('.header25').innerHTML = 'СОБРАНО'
        alert(`СОБРАНО ${myArr.length}`)}
    else if (myArr.length === 16 && finish === true) {
        document.querySelector('.header16').innerHTML = 'СОБРАНО'
        alert(`СОБРАНО ${myArr.length}`)}
    else if (myArr.length === 9 && finish === true) {
        document.querySelector('.header9').innerHTML = 'СОБРАНО'
        alert(`СОБРАНО ${myArr.length}`)}
})