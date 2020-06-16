'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let height = canvas.height;
let width = canvas.width;

let blockSize = 10; //один блок игрового поля =10х10 пикселей
let heightInBlocks = height / blockSize; //высоты в блоках
let widthInBlocks = width / blockSize; //ширина в блоках

let score = 0; //счет игры
let paused = false; //триггер для определения на паузе ли игра
let gameOvered = false; //триггер для определения, что игра проиграна

//рисование рамки игрового поля -- .fillRect(x,y,width,height)
let drawBorder = function(){
	ctx.fillStyle = 'gray';
	ctx.fillRect(0, 0, width, blockSize); //верхняя сторона границы
	ctx.fillRect(0, 0, blockSize, height); //левая сторона границы
	ctx.fillRect(0, height - blockSize, width, blockSize); //нижняя сторона границы
	ctx.fillRect(width - blockSize, 0, blockSize, height); //правая сторона границы
};

//отображение счета на игровом поле -- .fillText(<string>,x,y)
let drawScore = function(){
	ctx.font = '20px Courier';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'left'; //выравнивание по левому краю
	ctx.textBaseline = 'top'; //базовая линия текста сверху
	ctx.fillText('SCORE: ' + score, blockSize, blockSize);
};

//реализация конца игры
let gameOver = function(){
	gameOvered = true;
	stopAnimation();

	ctx.font = '60px Courier';
	ctx.fillStyle = 'red';
	ctx.textAlign = 'center'; //выравнивание по центру
	ctx.textBaseline = 'middle'; //базовая линия текста посередине
	ctx.fillText('GAME OVER', height / 2, width / 2);
};



//конструктор для ячейки игрового поля -- col - cтолбец, row - строка
let Block = function(col, row){
	this.col = col;
	this.row = row;
};

//добавление в прототип Block метода для рисования квадрата
Block.prototype.drawSquare = function(color){
	let x = this.col * blockSize;
	let y = this.row * blockSize;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, blockSize, blockSize);
};

//добавление в прототип Block метода для рисования круга
Block.prototype.drawCircle = function(color){
	let centerX = this.col * blockSize + blockSize / 2;
	let centerY = this.row * blockSize + blockSize / 2;

	ctx.beginPath();
	ctx.arc(centerX, centerY, blockSize / 2, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();
};

//добавление в прототип Block метода для рисования глаз горизонтально
Block.prototype.drawEyesHoriz = function(color){
	let centerX1 = this.col * blockSize + blockSize * (1 / 4);
	let centerY1 = this.row * blockSize + blockSize / 2;

	ctx.beginPath();
	ctx.arc(centerX1, centerY1, blockSize / 4, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();

	let centerX2 = this.col * blockSize + blockSize * (3 / 4);
	let centerY2 = this.row * blockSize + blockSize / 2;

	ctx.beginPath();
	ctx.arc(centerX2, centerY2, blockSize / 4, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();
};

//добавление в прототип Block метода для рисования глаз вертикально
Block.prototype.drawEyesVert = function(color){
	let centerX1 = this.col * blockSize + blockSize / 2;
	let centerY1 = this.row * blockSize + blockSize * (1 / 4);

	ctx.beginPath();
	ctx.arc(centerX1, centerY1, blockSize / 4, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();

	let centerX2 = this.col * blockSize + blockSize / 2;
	let centerY2 = this.row * blockSize + blockSize * (3 / 4);

	ctx.beginPath();
	ctx.arc(centerX2, centerY2, blockSize / 4, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();
};

// добавление в прототип Block метода для проверки ячейки на совпадение координат
// с другой ячейков -- вернет true если совпадение есть
Block.prototype.equal = function(otherBlock){
	return this.col === otherBlock.col && this.row === otherBlock.row;
};



// конструктор для змейки, ячейки тела хранятся в массиве
// голова - первый элемент массива
let Snake = function(){
	this.segments = [
		new Block(7,5),
		new Block(6,5),
		new Block(5,5)
	];

	this.direction = 'right'; // текущий шаг анимации
	this.nextDirection = 'right'; // следующий шаг анимации
};

// добавление в прототип Snake метода рисования змейки (головы и тела)
Snake.prototype.draw = function(){
	// отрисовка тела
	for(let i = 0; i < this.segments.length; i++){
		this.segments[i].drawSquare('blue');
	}

	// глаза на первом блоке (голове)
	if (this.direction === 'left' || this.direction === 'right'){
		this.segments[0].drawEyesVert('#77ccff');
	} else {
		this.segments[0].drawEyesHoriz('#77ccff');
	}
};

// добавление в прототип Snake метода передвижения
// с проверкой на столкновения с препятствием и яблоком
Snake.prototype.move = function(){
	let head = this.segments[0];
	let newHead;

	this.direction = this.nextDirection;

	if (this.direction === 'right'){
		newHead = new Block(head.col + 1, head.row);
	} else if (this.direction === 'down'){
		newHead = new Block(head.col, head.row + 1);
	} else if (this.direction === 'left'){
		newHead = new Block(head.col - 1, head.row);
	} else if (this.direction === 'up'){
		newHead = new Block(head.col, head.row - 1);
	}

	if (this.checkCollision(newHead)){
		gameOver();
		return;
	}

	this.segments.unshift(newHead);

	if (newHead.equal(apple.position)){
		score++;
		apple.move();
	} else {
		this.segments.pop();
	}
};

// добавление в прототип Snake метода проверки на столкновение
// с границей или собственным хвостом
Snake.prototype.checkCollision = function(head){
	let leftCollision = (head.col === 0);
	let rightCollision = (head.col === widthInBlocks - 1);
	let topCollision = (head.row === 0);
	let bottomCollision = (head.row === heightInBlocks - 1);

	let wallCollision = leftCollision || rightCollision || topCollision || bottomCollision;

	let selfCollision = false;

	for (let i = 0; i < this.segments.length; i++){
		if(head.equal(this.segments[i])){
			selfCollision = true;
		}
	}

	return wallCollision || selfCollision;
};

// добавление в прототип Snake метода установки направления 
// eсли направление меняется на противоположное - происходит выход из 
// функции без изменения направления движения
Snake.prototype.setDirection = function(newDirection){
	if (this.direction === 'up' && newDirection === 'down'){
		return;
	} else if (this.direction === 'right' && newDirection === 'left') {
		return;
	} else if (this.direction === 'down' && newDirection === 'up') {
		return;
	} else if (this.direction === 'left' && newDirection === 'right') {
		return;
	}

	this.nextDirection = newDirection;
};



// конструктор для Яблока
let Apple = function(){
	this.position = new Block(10,10);
};

// добавление в прототип Apple метода рисования
Apple.prototype.draw = function(){
	this.position.drawCircle('#cb0000');
};

// добавление в прототип Apple метода перемещения яблока
// в случайную пустую позицию на игровом поле
Apple.prototype.move = function(){
	let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1; // random от 1 до 38
	let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;

	this.position = new Block(randomCol, randomRow);

	//если позиция нового яблока попадает на змейку - вызвать .move еще раз
	for (let i = 0; i < snake.segments.length; i++){
		if (this.position.equal(snake.segments[i])){
			this.move();
		}
	}

};



//объект с соответствием кодов клавиш их названиям
let directions = {
	32: 'space', // пауза

	37: 'left', // управление движением
	38: 'up',
	39: 'right',
	40: 'down'
};

//обработчик событий keydown (на клавиатуре)
document.addEventListener('keydown', function(event){
	if(!gameOvered){
		if (directions[event.keyCode] === 'space' && !paused){

			paused = true;
			stopAnimation();

			btnPause.classList.toggle('paused');

		} else if (directions[event.keyCode] === 'space'){

			paused = false;
			startAnimation();

			btnPause.classList.toggle('paused');

		} else if (directions[event.keyCode] !== 'space'){
			let newDirection = directions[event.keyCode];

			if (newDirection !== undefined){
			snake.setDirection(newDirection);
			}
		}
	}	
});

//обработчики нажатия кнопок управления на экране
let btnUp = document.getElementById('btn_up');
let btnLeft = document.getElementById('btn_left');
let btnPause = document.getElementById('btn_pause');
let btnRight = document.getElementById('btn_right');
let btnDown = document.getElementById('btn_down');

btnUp.onclick = function(){
	snake.setDirection('up');
};

btnLeft.onclick = function(){
	snake.setDirection('left');
};

btnPause.onclick = function(){

	if(!gameOvered){
		this.classList.toggle('paused');

		if (!paused){
			paused = true;
			stopAnimation();
		} else {
			paused = false;
			startAnimation();
		} 
	}
};

btnRight.onclick = function(){
	snake.setDirection('right');
};

btnDown.onclick = function(){
	snake.setDirection('down');	
};



let snake = new Snake();
let apple = new Apple();

let intervalId; 

// один шаг анимации
let animation = function(){
	ctx.clearRect(0, 0, width, height); //очистка всего холста

	drawBorder();
	drawScore();
	snake.move();
	snake.draw();
	apple.draw();
};

// запуск анимации с частотой кадров = 10 fps
let startAnimation = function(){
	intervalId = setInterval(animation, 100); // 1 сек / 100 мс = 10 frames per second
};

// остановка анимации
let stopAnimation = function(){
	clearInterval(intervalId);
};



startAnimation();