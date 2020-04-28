// Перед тобой три (от 3 до 10) двери, за одной из них приз. Ты выбираешь одну из трех дверей. Затем ведущий открывает одну из двух оставшихся, которая оказывается пустой.
// Надо ли менять выбранный вариант, чтобы повысить шанс выигрыша?


let arrDoors = []; // массив дверей
let textResultDiv = document.getElementById('result'); // блок для текстового вывода результатов
let visualResultDiv = document.getElementById('output'); // блок для визуального вывода результатов

let firstChoiceSuccess; // счетчик угадываний с первой попытки
let secondChoiceSuccess; // счетчик угадываний со второй попытки

let divDoors, divDoor; // переменные для генерации блока визуальной отрисовки дверей



//генериует quantity эксперементов с количеством дверей doorsNum
function generate(quantity, doorsNum){

    firstChoiceSuccess = 0; // счетчик угадываний приза игроком с первой попытки
    secondChoiceSuccess = 0; // счетчик угадываний приза игроком со второй попытки

    visualResultDiv.innerHTML = ''; //очистка визуального отображения

    while (quantity > 0){

        arrDoors = createNewDoorsArr(doorsNum); // создание массива с пустыми дверями

        randomElement(arrDoors).prize = true; //установка приза в случайную дверь
        randomElement(arrDoors).userFirstChoice = true; //первоначальный выбор игроком случайной двери

        // проверка на выигрыш первой попытки игрока с инкрементом счетчика, если попытка успешная
        checkFirstTry(arrDoors);

        // открытие ведущим одной пустой двери
        openOneEmptyDoor(arrDoors);

        // проверка на выигрыш второй попытки игрока с инкрементом счетчика, если попытка успешная
        checkSecondTry(arrDoors);

        // отрисовка блока с дверями на основе текущего массива в конце документа
        addDoorVisualBlock(arrDoors, quantity);

        quantity--;
    }

    textResultDiv.innerHTML = ``; // очистка текстового отображения
    textResultDiv.innerHTML += `
                                С первой попытки угадано ${firstChoiceSuccess} раз. <br> 
                                Со второй попытки угадано ${secondChoiceSuccess} раз.<br>`; //вывод текстового результата экперемента
}




//создание заготовки массива пустых дверей из num элементов
// формата:
// [
//     {number: 1, prize: false, userFirstChoice: false, userSecondChoice: false, opened: false},
//     {number: 2, prize: false, userFirstChoice: false, userSecondChoice: false, opened: false},
//     {number: 3, prize: false, userFirstChoice: false, userSecondChoice: false, opened: false}
// ] 

function createNewDoorsArr(num){
    let arr = [];
    let arrElem = {};

    for (let i = 1; i <= num; i++) {
        arrElem = {number: i, prize: false, userFirstChoice: false, userSecondChoice: false, opened: false};
        arr.push(arrElem);
    }

    return arr;
}

//возвращает случайный элемент массива
function randomElement(array){
    let length = array.length;
    let randomIndex = Math.floor(Math.random() * length);
    let randomElem = array[randomIndex];

    return randomElem;
}

// проверка на выигрыш первой попытки игрока
function checkFirstTry(array){
    for (let i = 0; i < array.length; i++) {
        if (array[i].prize && array[i].userFirstChoice) {
            firstChoiceSuccess++;
        }
    }
}

// открытие ведущим пустых дверей
function openOneEmptyDoor(array){
    
    let doorsOpened = 0; //сколько дверей открыто

    for (let i = 0; i < array.length; i++) {
        if (array[i].prize === false && array[i].userFirstChoice === false && array[i].opened === false && doorsOpened < (array.length - 2)) {
            
            array[i].opened = true;
            doorsOpened++;
        }
    }
}

// проверка на выигрыш второй попытки игрока
function checkSecondTry(array){

    // выбор игроком альтернативной двери
    for (let i = 0; i < array.length; i++) {
        if (array[i].opened === false && array[i].userFirstChoice === false) {
            array[i].userSecondChoice = true;
        }
    }

    // проверка альтернативной двери на выигрыш
    for (let i = 0; i < array.length; i++) {
        if (array[i].prize === true && array[i].userSecondChoice === true) {
            secondChoiceSuccess++;
        }
    }
}

// отрисовка в конце документа блока с дверями на основе текущего массива
function addDoorVisualBlock(array, quantity){

    divDoors = document.createElement('div');
    divDoors.classList = `doors try-${quantity}`;

    for (let i = 0; i < array.length; i++) {

        divDoor = document.createElement('div');
        divDoor.classList = `door`;

        if (array[i].prize) {
            divDoor.classList.toggle('prize');
        }

        if (array[i].opened) {
            divDoor.innerHTML = ``;
            divDoor.innerHTML = `X`;
        } else if (array[i].userSecondChoice) {
            divDoor.innerHTML = ``;
            divDoor.innerHTML = `2`;
        } else if (array[i].userFirstChoice) {
            divDoor.innerHTML = ``;
            divDoor.innerHTML = `1`;
        }

        divDoors.appendChild(divDoor);
    }

    visualResultDiv.appendChild(divDoors);
}