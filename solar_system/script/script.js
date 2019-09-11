'use strict';

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

context.lineWidth = 0.3;

//текущий год (один оборот Земли вокруг солнца)
let year = 1;

//соотношение орбит и радиусов планет в этой группе 1:1

let sun = {x: 500, y: 500, radius: 50, color: '#f5de5d', img: document.getElementById('sun')};
let mercury = {x: 557, y: 500, radius: 3, color: '#a6a4a2', orbit: 57, img: document.getElementById('mercury')};
let venus = {x: 608, y: 500, radius: 9.5, color: '#e0c396', orbit: 108, img: document.getElementById('venus')};
let earth = {x: 650, y: 500, radius: 10, color: '#abd4d0',orbit: 150, img: document.getElementById('earth')};
let mars = {x: 728, y: 500, radius: 5, color: '#873e2e',orbit: 228, img: document.getElementById('mars')};


//орбиты и радиусы аутентичного соотношения не имеют

let jupiter = {x: 820, y: 500, radius: 30, color: '#ceb193',orbit: 320, img: document.getElementById('jupiter')};
let saturn = {x: 890, y: 500, radius: 33, color: '#e0d8cc',orbit: 390, img: document.getElementById('saturn')};
let uran = {x: 945, y: 500, radius: 13, color: '#3994e3',orbit: 445, img: document.getElementById('uran')};
let neptun = {x: 980, y: 500, radius: 11, color: '#05459e',orbit: 480, img: document.getElementById('neptun')};


//описываем функцию по отрисовке планеты
let drawPlanet = function(obj){
	context.drawImage(obj.img, obj.x - obj.radius, obj.y - obj.radius, obj.radius * 2, obj.radius * 2);
};



//вращение на grad градусов
let rotateStep = function(grad){

	//очистка canvas
	context.clearRect(0, 0, canvas.width, canvas.height); 

	//рисуем орбиты планет
	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, mercury.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, venus.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, earth.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, mars.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, jupiter.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, saturn.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, uran.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.beginPath();
	context.strokeStyle = 'grey';
	context.arc(sun.x, sun.y, neptun.orbit, 0, Math.PI * 2, false);
	context.stroke();

	//********Солнце********
	drawPlanet(sun);

	//***************отрисовка планет со смещением grad***************
		
	//********Меркурий********
	//отношение года на Земле к году на Меркурии = 4.1

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 4.1); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(mercury);
		
	context.restore(); //восстановить состояние контекста

	//********Венера********
	//отношение года на Земле к году на Венере = 1.6

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 1.6); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(venus);
		
	context.restore(); //восстановить состояние контекста

	//********Земля********

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(earth);
		
	context.restore(); //восстановить состояние контекста

	//********Марс********
	//отношение года на Земле к году на Марсе = 0.5

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 0.5); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(mars);
		
	context.restore(); //восстановить состояние контекста

	//********Юпитер********
	//отношение года на Земле к году на Юпитере = 0.085

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 0.085); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(jupiter);
		
	context.restore(); //восстановить состояние контекста

	//********Сатурн********
	//отношение года на Земле к году на Сатурне = 0.0365

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 0.0365); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(saturn);
		
	context.restore(); //восстановить состояние контекста
		
	//********Уран********
	//отношение года на Земле к году на Уране = 0.0121

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 0.0121); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(uran);
		
	context.restore(); //восстановить состояние контекста

	//********Нептун********
	//отношение года на Земле к году на Нептуне = 0.006

	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
	context.rotate(Math.PI / 180 * grad * 0.006); //повернуть контекст на grad градусов относительно центра по часовой
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	drawPlanet(neptun);
		
	context.restore(); //восстановить состояние контекста
};



//увеличение летоисчисления

let yearCount = function(){
	document.getElementById('timer').innerText = `Year: ${++year}`;
};


		
//рекурсивный цикл увеличения градусов поворота
// speed - интервал отрисовки (чем меньше тем быстрее)
// ПОТЕНЦИАЛЬНАЯ ПРОБЛЕМА - i увеличивается бесконечно

let rotate = function(speed){
	let i = 0;

	function f(){
		rotateStep(i);
		i++;

		//триггер тысячных отсечек
		if(i%360 === 0){yearCount();}

		setTimeout(f, speed);
	}
	f();
};




window.onload = function(){
	rotateStep(0);
	rotate(41); // такая частота дает примерно 24 fps
};



