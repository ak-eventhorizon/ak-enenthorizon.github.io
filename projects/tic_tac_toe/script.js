var turn_number; //счетчик номеров хода
var FIELD_SIZE = 3; //размер игрового поля по умолчанию
var gameMatrix = []; //матрица игры - двумерный массив
var countXWins = 0; // счет побед Х
var countOWins = 0; // счет побед О

interface_generate();
startTheGame();


//--OK создание и заполнение вспомогательных блоков (внутри interface)
function interface_generate() {

    let interface = document.querySelector('.interface');
    interface.innerHTML = ''; //очистка содержимого блока

    let turn = document.createElement('div');
    turn.className = 'turn';
    turn.innerHTML = 'TURN: ' + whos_turn();
    interface.appendChild(turn);

    let stat = document.createElement('div');
    stat.className = 'stat';
    stat.innerHTML = 'Wins: X = ' + countXWins + '; O = ' + countOWins;
    interface.appendChild(stat);

    let select = document.createElement('select');
    select.className = 'select';
    select.innerHTML = '<option value="3">3x3</option><option value="4">4x4</option><option value="5">5x5</option><option value="6">6x6</option><option value="7">7x7</option><option value="8">8x8</option><option value="9">9x9</option><option value="10">10x10</option>';
    interface.appendChild(select);

    // тот блок option, у которо value равен FIELD_SIZE становится выбран
    let option = select.getElementsByTagName('option');
    for (let i = 0; i < option.length; i++) {
        if (+option[i].value === FIELD_SIZE) {
            option[i].selected = true;
        }
    }

    let button = document.createElement('div');
    button.className = 'button';
    button.innerHTML = 'New Game';
    interface.appendChild(button);

    // ожидание клика на элементе интерфейса button
    button.onclick = startTheGame;


}


//--OK вычисление кто ходит
function whos_turn() {
    //возвращает 'X' или 'O', пока номер хода меньше количества клеток поля
    while (turn_number <= FIELD_SIZE * FIELD_SIZE) {
        if (turn_number % 2) {
            //ход нечетный - крестики
            return 'X';
        } else {
            //ход четный - нолики
            return 'O';
        }
    }
}


//--OK новая игра без обнуления статистики
function startTheGame() {

    //сброс номера хода в начало
    turn_number = 1;

    // возобнавление указателя ходов сначала
    let turn = document.querySelector('.turn');
    turn.innerHTML = 'TURN: ' + whos_turn();

    //FIELD_SIZE меняется на value того option, который выбран
    let option = document.querySelector('.select').getElementsByTagName('option');
    for (let i = 0; i < option.length; i++) {
        if (option[i].selected === true) {
            FIELD_SIZE = +option[i].value;
        }
    }

    //перегенерация игрового поля начисто
    field_generate(FIELD_SIZE);

    //запуск ожидания клика
    click();
}


//--OK генерация игрового поля с очисткой содержимого
function field_generate(size) {

    let field = document.querySelector('.field');
    field.innerHTML = '';

    for (let i = 0; i < size; i++) {

        let line = document.createElement('div');
        line.className = 'line line-' + i;
        field.appendChild(line);


        for (let j = 0; j < size; j++) {
            let element = document.createElement('div');
            element.className = 'cell empty';
            element.id = (j + '-' + i); //id - координаты XY
            line.appendChild(element);
        }
    }
}


//--OK ожидание событий клика по клетке поля
function click() {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].onclick = make_turn;
    }
}


//--OK ход игрока по клику на поле
function make_turn(cellClicked) {


    //действия производятся над ячейкой, если она пустая
    if (cellClicked.target.classList[1] === 'empty') {

        //изменение класса ячейки при клике на нее
        cellClicked.target.classList.toggle('empty');
        cellClicked.target.classList.toggle('not_empty');

        //установка в ячейку символа ходящего
        cellClicked.target.innerHTML = whos_turn();

        //перегенерация матрицы игры после каждого хода
        gameMatrix_generate();


        let clickXY = cellClicked.target.id.split('-');

        // победа
        if (check_result(clickXY)) {
            finishTheGameWin();
        }
        // ничья
        else if (turn_number === FIELD_SIZE * FIELD_SIZE) {
            finishTheGameDraw();
        }
        // продолжение
        else {

            //увеличение счетчика ходов
            turn_number++;

            //перегенерация интерфейса после каждого хода
            interface_generate();
        }
    }
}


//--OK генерация матрицы игры
function gameMatrix_generate() {
    for (let y = 0; y < FIELD_SIZE; y++) {
        gameMatrix[y] = [];
        for (let x = 0; x < FIELD_SIZE; x++) {

            let currentCell = document.getElementById(x + '-' + y).innerHTML;

            if (currentCell === 'X' || currentCell === 'O') {
                gameMatrix[y][x] = currentCell;
            } else {
                gameMatrix[y][x] = null;
            }
        }
    }

    //по четыре пустых элемента сверху и снизу индекса массива введены для чтобы не было ошибки при рассчетах в функции check_result
    gameMatrix[-1] = [];
    gameMatrix[-2] = [];
    gameMatrix[-3] = [];
    gameMatrix[-4] = [];
    gameMatrix[FIELD_SIZE] = [];
    gameMatrix[FIELD_SIZE + 1] = [];
    gameMatrix[FIELD_SIZE + 2] = [];
    gameMatrix[FIELD_SIZE + 3] = [];
}


//--OK проверка результата игры на выигрыш
// на вход XY кликнутой ячейки - на выход true/false
function check_result(xy) {
    let x = +xy[0]; // координата X из id
    let y = +xy[1]; // координата Y из id
    let gm = gameMatrix[y][x];

    // проверка на три в ряд с добавлением класса выигрывшим ячейкам
    if (FIELD_SIZE <= 4) {

        if (gm === gameMatrix[y - 1][x] && gm === gameMatrix[y + 1][x]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y-1)).classList.toggle('win');
            document.getElementById(x+'-'+(y+1)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y][x - 1] && gm === gameMatrix[y][x + 1]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+y).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y + 1][x - 1] && gm === gameMatrix[y - 1][x + 1]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y-1)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y - 1][x - 1] && gm === gameMatrix[y + 1][x + 1]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y+1)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y - 1][x] && gm === gameMatrix[y - 2][x]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y-1)).classList.toggle('win');
            document.getElementById(x+'-'+(y-2)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y - 1][x + 1] && gm === gameMatrix[y - 2][x + 2]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y-2)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y][x + 1] && gm === gameMatrix[y][x + 2]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+y).classList.toggle('win');
            document.getElementById((x+2)+'-'+y).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y + 1][x + 1] && gm === gameMatrix[y + 2][x + 2]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y+2)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y + 1][x] && gm === gameMatrix[y + 2][x]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y+1)).classList.toggle('win');
            document.getElementById(x+'-'+(y+2)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y + 1][x - 1] && gm === gameMatrix[y + 2][x - 2]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y+2)).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y][x - 1] && gm === gameMatrix[y][x - 2]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+y).classList.toggle('win');
            document.getElementById((x-2)+'-'+y).classList.toggle('win');
            return true;
        } else if (gm === gameMatrix[y - 1][x - 1] && gm === gameMatrix[y - 2][x - 2]) {
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y-2)).classList.toggle('win');
            return true;
        } else {
            return false;
        }

    }

    // проверка на пять в ряд с добавлением класса выигрывшим ячейкам
    else if (FIELD_SIZE > 4) {

        if(gm === gameMatrix[y - 1][x] && gm === gameMatrix[y - 2][x] && gm === gameMatrix[y - 3][x] && gm === gameMatrix[y - 4][x]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y-1)).classList.toggle('win');
            document.getElementById(x+'-'+(y-2)).classList.toggle('win');
            document.getElementById(x+'-'+(y-3)).classList.toggle('win');
            document.getElementById(x+'-'+(y-4)).classList.toggle('win');
            return true;  
        } else if(gm === gameMatrix[y + 1][x] && gm === gameMatrix[y - 1][x] && gm === gameMatrix[y - 2][x] && gm === gameMatrix[y - 3][x]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y+1)).classList.toggle('win');
            document.getElementById(x+'-'+(y-1)).classList.toggle('win');
            document.getElementById(x+'-'+(y-2)).classList.toggle('win');
            document.getElementById(x+'-'+(y-3)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x] && gm === gameMatrix[y + 2][x] && gm === gameMatrix[y - 1][x] && gm === gameMatrix[y - 2][x]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y+1)).classList.toggle('win');
            document.getElementById(x+'-'+(y+2)).classList.toggle('win');
            document.getElementById(x+'-'+(y-1)).classList.toggle('win');
            document.getElementById(x+'-'+(y-2)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x] && gm === gameMatrix[y + 2][x] && gm === gameMatrix[y + 3][x] && gm === gameMatrix[y - 1][x]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y+1)).classList.toggle('win');
            document.getElementById(x+'-'+(y+2)).classList.toggle('win');
            document.getElementById(x+'-'+(y+3)).classList.toggle('win');
            document.getElementById(x+'-'+(y-1)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x] && gm === gameMatrix[y + 2][x] && gm === gameMatrix[y + 3][x] && gm === gameMatrix[y + 4][x]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById(x+'-'+(y+1)).classList.toggle('win');
            document.getElementById(x+'-'+(y+2)).classList.toggle('win');
            document.getElementById(x+'-'+(y+3)).classList.toggle('win');
            document.getElementById(x+'-'+(y+4)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y][x - 1] && gm === gameMatrix[y][x - 2] && gm === gameMatrix[y][x - 3] && gm === gameMatrix[y][x - 4]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+y).classList.toggle('win');
            document.getElementById((x-2)+'-'+y).classList.toggle('win');
            document.getElementById((x-3)+'-'+y).classList.toggle('win');
            document.getElementById((x-4)+'-'+y).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y][x + 1] && gm === gameMatrix[y][x - 1] && gm === gameMatrix[y][x - 2] && gm === gameMatrix[y][x - 3]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+y).classList.toggle('win');
            document.getElementById((x-2)+'-'+y).classList.toggle('win');
            document.getElementById((x-3)+'-'+y).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y][x + 1] && gm === gameMatrix[y][x + 2] && gm === gameMatrix[y][x - 1] && gm === gameMatrix[y][x - 2]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+y).classList.toggle('win');
            document.getElementById((x+2)+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+y).classList.toggle('win');
            document.getElementById((x-2)+'-'+y).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y][x + 1] && gm === gameMatrix[y][x + 2] && gm === gameMatrix[y][x + 3] && gm === gameMatrix[y][x - 1]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+y).classList.toggle('win');
            document.getElementById((x+2)+'-'+y).classList.toggle('win');
            document.getElementById((x+3)+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+y).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y][x + 1] && gm === gameMatrix[y][x + 2] && gm === gameMatrix[y][x + 3] && gm === gameMatrix[y][x + 4]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+y).classList.toggle('win');
            document.getElementById((x+2)+'-'+y).classList.toggle('win');
            document.getElementById((x+3)+'-'+y).classList.toggle('win');
            document.getElementById((x+4)+'-'+y).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y - 1][x + 1] && gm === gameMatrix[y - 2][x + 2] && gm === gameMatrix[y - 3][x + 3] && gm === gameMatrix[y - 4][x + 4]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y-2)).classList.toggle('win');
            document.getElementById((x+3)+'-'+(y-3)).classList.toggle('win');
            document.getElementById((x+4)+'-'+(y-4)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x - 1] && gm === gameMatrix[y - 1][x + 1] && gm === gameMatrix[y - 2][x + 2] && gm === gameMatrix[y - 3][x + 3]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y-2)).classList.toggle('win');
            document.getElementById((x+3)+'-'+(y-3)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x - 1] && gm === gameMatrix[y + 2][x - 2] && gm === gameMatrix[y - 1][x + 1] && gm === gameMatrix[y - 2][x + 2]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y+2)).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y-2)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x - 1] && gm === gameMatrix[y + 2][x - 2] && gm === gameMatrix[y + 3][x - 3] && gm === gameMatrix[y - 1][x + 1]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y+2)).classList.toggle('win');
            document.getElementById((x-3)+'-'+(y+3)).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y-1)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x - 1] && gm === gameMatrix[y + 2][x - 2] && gm === gameMatrix[y + 3][x - 3] && gm === gameMatrix[y + 4][x - 4]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y+2)).classList.toggle('win');
            document.getElementById((x-3)+'-'+(y+3)).classList.toggle('win');
            document.getElementById((x-4)+'-'+(y+4)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x + 1] && gm === gameMatrix[y + 2][x + 2] && gm === gameMatrix[y + 3][x + 3] && gm === gameMatrix[y + 4][x + 4]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y+2)).classList.toggle('win');
            document.getElementById((x+3)+'-'+(y+3)).classList.toggle('win');
            document.getElementById((x+4)+'-'+(y+4)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x + 1] && gm === gameMatrix[y + 2][x + 2] && gm === gameMatrix[y + 3][x + 3] && gm === gameMatrix[y - 1][x - 1]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y+2)).classList.toggle('win');
            document.getElementById((x+3)+'-'+(y+3)).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y-1)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x + 1] && gm === gameMatrix[y + 2][x + 2] && gm === gameMatrix[y - 1][x - 1] && gm === gameMatrix[y - 2][x - 2]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x+2)+'-'+(y+2)).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y-2)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y + 1][x + 1] && gm === gameMatrix[y - 1][x - 1] && gm === gameMatrix[y - 2][x - 2] && gm === gameMatrix[y - 3][x - 3]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x+1)+'-'+(y+1)).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y-2)).classList.toggle('win');
            document.getElementById((x-3)+'-'+(y-3)).classList.toggle('win');
            return true;
        } else if(gm === gameMatrix[y - 1][x - 1] && gm === gameMatrix[y - 2][x - 2] && gm === gameMatrix[y - 3][x - 3] && gm === gameMatrix[y - 4][x - 4]){
            document.getElementById(x+'-'+y).classList.toggle('win');
            document.getElementById((x-1)+'-'+(y-1)).classList.toggle('win');
            document.getElementById((x-2)+'-'+(y-2)).classList.toggle('win');
            document.getElementById((x-3)+'-'+(y-3)).classList.toggle('win');
            document.getElementById((x-4)+'-'+(y-4)).classList.toggle('win');
            return true;
        } else {
            return false;
        }
    }
}


//--OK окончание игры в случае выигрыша
function finishTheGameWin() {

    //смена класса всем ячейкам на not_empty для некликабельности
    let cells = document.getElementsByClassName('empty');

    if (cells[0] != undefined) { // проверка, что есть хоть один блок not_empty
        do {
            cells[0].classList.toggle('not_empty');
            cells[0].classList.toggle('empty');
        }
        while (cells.length > 0);
    }

    // объявление победителя в блоке turn
    let turn = document.querySelector('.turn');
    turn.innerHTML = 'WINNER: ' + whos_turn();

    //изменение статистики побед в блоке stat
    let stat = document.querySelector('.stat');
    if (whos_turn() === 'X') {
        ++countXWins;
    } else if (whos_turn() === 'O') {
        ++countOWins;
    }
    stat.innerHTML = 'Wins: X = ' + countXWins + '; O = ' + countOWins;
}


//--OK окончание игры в случае ничьей
function finishTheGameDraw() {

    // объявление о ничьей
    let turn = document.querySelector('.turn');
    turn.innerHTML = 'DRAW!';

}
