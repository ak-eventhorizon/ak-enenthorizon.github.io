// Разработать приложение-калькулятор, которое позволит ввести математическое выражение с одной 
// переменной, задать диапазон значений этой переменной и построить график функции.
// Модуль разбора выражений минимально должен поддерживать следующие операции:
// * Сложение
// * Вычитание
// * Умножение
// * Деление
// * Унарный минус
// * Скобки

//*************программа кривенькая, гордиться тут не чем, но работает*************


//определение параметров холста
let canvas = document.getElementById('graph');
let ctx = canvas.getContext('2d');
let width = canvas.width; // ширина - ось X
let height = canvas.height; // высота - ось Y



//функция рисования координатных осей и сетки
//с привязкой к пропорциям холста
const drawAxis = function(){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(0.5, height / 2 + 0.5); //поправка +0.5px для четкости линий
    ctx.lineTo(width + 0.5, height / 2 + 0.5); //ось X
    ctx.stroke();
    ctx.moveTo(width / 2 + 0.5, 0.5);
    ctx.lineTo(width / 2 + 0.5, height + 0.5); //ось Y
    ctx.stroke();

    ctx.font = ('14px serif');
    ctx.fillText('x',width - 10, height / 2 - 2);
    ctx.fillText('f(x)', width / 2 + 2, 14);

    //сетка горизонтальная
    ctx.lineWidth = 0.25;
    ctx.strokeStyle = 'grey';
    for(let i = 0; i <= 20; i++){
        ctx.moveTo((width / 20 * i) + 0.5, 0);
        ctx.lineTo((width / 20 * i) + 0.5, height);
    };
    ctx.stroke();

    //сетка вертикальная
    ctx.lineWidth = 0.25;
    ctx.strokeStyle = 'grey';
    for(let i = 0; i <= 20; i++){
        ctx.moveTo(0, (height / 20 * i) + 0.5);
        ctx.lineTo(width, (height / 20 * i) + 0.5);
    };
    ctx.stroke();
};



//рисование графика на основании значений во входном массиве
//размещение размерности на осях
const drawGraph = function(arr){

    //определение стоимости одного пикселя на холсте относительно 
    //максимальных абсолютных значений из массива результатов
    let maxX = checkMax(arr, 'x'); //максимальный из X
    let maxY = checkMax(arr, 'y'); //максимальный из Y
    let pixelXPrice = 1 / (maxX / (width / 2)); //столько пикселей занимает одна единица на оси
    let pixelYPrice = 1 / (maxY / (height / 2));

    // console.log(pixelXPrice +' px за одну единицу из '+ maxX +' по оси X');
    // console.log(pixelYPrice +' px за одну единицу из '+ maxY +' по оси Y');

    //очистка холста и переисовка координатной сетки
    ctx.clearRect(0, 0, width, height);
    drawAxis();

    //рисование графика
    ctx.save(); //сохранение контекста
    
    //размещение размерности на осях
    ctx.font = ('10px serif');
    ctx.textBaseline = 'top'; //равнение текста по верхнему краю
    ctx.textAlign = 'right'; //равнение текста по правому краю
    ctx.fillText(maxX, width - 2, (height / 2) + 2); //право
    ctx.fillText(maxY, (width / 2) - 2, 2); //верх
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('-'+maxX, 2, (height / 2) + 2); //лево
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'right';
    ctx.fillText('-'+maxY, (width / 2) - 2, height); //низ

    ctx.translate(width / 2 + 0.5, height / 2 + 0.5); //смещение точки отсчета координат в центр холста

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.moveTo(arr[0].x * pixelXPrice, -arr[0].y * pixelYPrice); // координата Y инвертирована чтобы учесть расчет координат в canvas
    for(let i = 1; i < arr.length; i++ ){
        ctx.lineTo(arr[i].x * pixelXPrice, -arr[i].y * pixelYPrice);
        //все размерности умножаются на их стоимость в пикселях для проекции на canvas
    };
    ctx.stroke();

    ctx.restore(); //восстановление контекста
};



//разбор массива объектов для определения максимальных значений x и y
//на вход получает array = [{x:-15,y:-10},...,{x:15,y:10}] и требуемую ось - x или y
const checkMax = function(arr, axis){
    let arrX = [];
    let arrY = [];
    let maxX;
    let maxY;

    for(let i = 0; i < arr.length; i++){
        arrX[i] = Math.abs(arr[i].x); //наполнение массива абсолютными значениями
        arrY[i] = Math.abs(arr[i].y); //наполнение массива абсолютными значениями
    };

    maxX = Math.max.apply(null, arrX); //определение максимального значения в массиве X
    maxY = Math.max.apply(null, arrY); //определение максимального значения в массиве Y

    if(axis === 'x' || axis === 'X'){
        return maxX;
    } else if(axis === 'y' || axis === 'Y'){
        return maxY;
    }
};



//***************************************************************************************************************
//******Функция расчета массива по введенной формуле и диапазону из формы - возвращает массив объектов***********
//*********************использование eval() нежелетельно, эту часть следует заменить парсером********************
//******************при передаче в eval() некорректно написанного выражение - ошибки в консоли*******************

const parseMathExp = function(string, begin, end, step){
    //список допустимых символов для использования в выражении
    let allowedSymbols = ['0','1','2','3','4','5','6','7','8','9',')','(','.','+','-','*','/','x'];
    let minX = Number(begin); //начало указанного диапазона
    let maxX = Number(end); //конец указанного диапазона
    let stepX = Number(step); //шаг вычислений
    
    let isInputCorrect; //флаг корректности введенных данных
    let resultArray = [];
    let x; //переменная для корректности выполнения eval() кода


    //проверка на содержание в форме только допустимых значений
    if (string === ''){

        isInputCorrect = false;
        alert('Выражение не указано!');

    } else if (
        (begin === '') || 
        (end === '') || 
        (step ==='') ||
        (isNaN(minX)) ||
        (isNaN(maxX)) ||
        (isNaN(stepX)) ||
        (maxX < minX)){

        isInputCorrect = false;
        alert('Диапазон или шаг заданы не корректно!');

    } else {

        for(let i = 0; i < string.length; i++){
            if (allowedSymbols.includes(string[i])) { //символ из строки входит в список разрешенных
                isInputCorrect = true;
            } else {
                isInputCorrect = false;
                alert('Выражение содержит недопустимые символы!');
                break;
            }
        }
    }



    if (isInputCorrect) {
        for(let i = minX; i <= maxX; i += stepX){
            let tempObj = {};
            x = i;
            y = eval(string);

            //проверка, что результат получился конечным числом, поскольку деление на ноль может дать Infinity, а 0/0 - NaN
            if (isFinite(y)){

                tempObj.x = x;
                tempObj.y = y;
                resultArray.push(tempObj);
            }
        }

        return resultArray;       

    } else {

        return -1; // возвращает -1 в случае любого не корректного ввода пользователя
        
    }
};



//действия по расчету массива и построению графа, привязанные к нажатию кнопки на форме
const clickHandler = function(){
    let userInputMathExp = document.getElementById('userMathExp').value;
    let userInputMin = document.getElementById('userScopeBegin').value;
    let userInputMax = document.getElementById('userScopeEnd').value;
    let userInputStep = document.getElementById('userStep').value;

    let resultArr = parseMathExp(userInputMathExp, userInputMin, userInputMax, userInputStep);

    // рисовать график только в случае корректного результата
    if (resultArr !== -1){
        drawGraph(resultArr);
    } 
};



//начальная отрисовка осей
drawAxis();







//***********пример массива для рассчетов***********
// let testArray1 = [
//     {x:-10,y:100},
//     {x:-9,y:81},
//     {x:-8,y:64},
//     {x:-7,y:49},
//     {x:-6,y:36},
//     {x:-5,y:25},
//     {x:-4,y:16},
//     {x:-3,y:9},
//     {x:-2,y:4},
//     {x:-1,y:1},
//     {x:0,y:0},
//     {x:1,y:1},
//     {x:2,y:4},
//     {x:3,y:9},
//     {x:4,y:16},
//     {x:5,y:25},
//     {x:6,y:36},
//     {x:7,y:49},
//     {x:8,y:64},
//     {x:9,y:81},
//     {x:10,y:100}
//     ];