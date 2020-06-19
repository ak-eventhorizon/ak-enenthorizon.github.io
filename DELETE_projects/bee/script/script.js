let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let height = canvas.height;
let width = canvas.width;

let bees = 100; //количество пчел
let beeArr = []; //пустой массив для объектов-пчел

//генерация массива из нужного количества пчел с одинаковой точкой появления
for (let i = 0; i < bees; i++){
	beeArr[i] = {beeNum: i, x: 100, y: 130};
}


//функция для рисование окружности
let circle = function(x, y, radius, fillCircle){
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);

	//если true - заливать окружность, иначе - только контур
	if (fillCircle){
		ctx.fill();
	} else {
		ctx.stroke();
	}
};


//функция для рисование пчелы в координатах x,y
let drawBee = function(x,y){
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'Black';
	ctx.fillStyle = 'Gold';

	circle(x, y, 8, true);
	circle(x, y, 8, false);

	ctx.fillStyle = 'White';

	circle(x-5, y-11, 5, true);
	circle(x-5, y-11, 5, false);
	circle(x+5, y-11, 5, true);
	circle(x+5, y-11, 5, false);
	circle(x-2, y-1, 2, false);
	circle(x+2, y-1, 2, false);
};


//изменение координаты случайным образом
let update = function(coordinate){
	let offset = Math.random()*4-2;  //смещение - рандомное число от -2 до 2
	coordinate += offset;

	if(coordinate > 400){
		coordinate = 400;
	} else if (coordinate < 0){
		coordinate = 0;
	}

	return coordinate;
};


//запуск анимации
setInterval(function(){
	//очистка холста
	ctx.clearRect(0, 0, width, height);

	//отрисовка каждой пчелы из массива
	for (let i = 0; i < beeArr.length; i++){

		drawBee(beeArr[i].x, beeArr[i].y);
		beeArr[i].x = update(beeArr[i].x);
		beeArr[i].y = update(beeArr[i].y);
	}

	ctx.strokeRect(0, 0, width, height); //рамка вокруг поля
}, 30);