'use strict';

let canvas = document.getElementById('solar_system');
let context = canvas.getContext('2d');
context.canvas.width  = canvas.clientWidth;
context.canvas.height = canvas.clientHeight;

//единица измерения - одна тысячная стороны квадрата Canvas
//изначально - использовался холст 1000x1000px
let unit = canvas.clientWidth / 1000;

//флаг, указывающий рисовать орбиты или нет
let visibleOrbits = true;

//индекс текущей скорости в массиве rotateSpeedsArr
let rotateSpeedIndex = 2;

// возможные значения скоростей вращения (чем меньше тем быстрее)
// средняя скорость - 41 - дает примерно 24 fps
let rotateSpeedsArr = [161,81,41,21,1];

//текущая скорость вращения
let rotateSpeed = rotateSpeedsArr[rotateSpeedIndex];

//флаг, указывающий остановлено ли вращение
let rotatePaused = false;

//конструктор для создания <img> с атрибутом src
let ImagePlanet = function(src){
	let img = new Image();
	img.src = src;
	return img;
};



//соотношение орбит и радиусов планет в этой группе аутентичное

let sun = {
	x: 500*unit,
	y: 500*unit,
	radius: 50*unit,
	color: '#f5de5d',
	orbit: 0,
	img: ImagePlanet('img/sun.png'),
	rotateRatio: 0
};

let mercury = {
	x: 557*unit,
	y: 500*unit,
	radius: 3*unit,
	color: '#a6a4a2',
	orbit: 57*unit,
	img: ImagePlanet('img/mercury.png'),
	rotateRatio: 4.1 //отношение года на Земле к году на Меркурии = 4.1
};

let venus = {
	x: 608*unit,
	y: 500*unit,
	radius: 9.5*unit,
	color: '#e0c396',
	orbit: 108*unit,
	img: ImagePlanet('img/venus.png'),
	rotateRatio: 1.6
};

let earth = {
	x: 650*unit,
	y: 500*unit,
	radius: 10*unit,
	color: '#abd4d0',
	orbit: 150*unit,
	img: ImagePlanet('img/earth.png'),
	rotateRatio: 1
};

let mars = {
	x: 728*unit,
	y: 500*unit,
	radius: 5*unit,
	color: '#873e2e',
	orbit: 228*unit,
	img: ImagePlanet('img/mars.png'),
	rotateRatio: 0.53
};


//орбиты и радиусы этой группы аутентичного соотношения не имеют

let jupiter = {
	x: 820*unit,
	y: 500*unit,
	radius: 30*unit,
	color: '#ceb193',
	orbit: 320*unit,
	img: ImagePlanet('img/jupiter.png'),
	rotateRatio: 0.085
};

let saturn = {
	x: 890*unit,
	y: 500*unit,
	radius: 33*unit,
	color: '#e0d8cc',
	orbit: 390*unit,
	img: ImagePlanet('img/saturn.png'),
	rotateRatio: 0.0365
};

let uran = {
	x: 945*unit,
	y: 500*unit,
	radius: 13*unit,
	color: '#3994e3',
	orbit: 445*unit,
	img: ImagePlanet('img/uran.png'),
	rotateRatio: 0.0121
};

let neptun = {
	x: 980*unit,
	y: 500*unit,
	radius: 11*unit,
	color: '#05459e',
	orbit: 480*unit,
	img: ImagePlanet('img/neptun.png'),
	rotateRatio: 0.006
};



//функция по отрисовке планеты
let drawPlanet = function(obj, angle = 0){
	context.save(); //сохранить состояние контекста
	context.translate(sun.x, sun.y); //сместить центр координат в центр солнца
	//повернуть контекст на angle градусов с учетом коэффициента вращения планеты
	context.rotate(Math.PI / 180 * angle * obj.rotateRatio);
	context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

	//рисуем планету
	context.drawImage(obj.img, obj.x - obj.radius, obj.y - obj.radius, obj.radius * 2, obj.radius * 2);
	
	context.restore(); //восстановить состояние контекста
};

//функция по отрисовке орбиты
let drawOrbit = function(obj, lineWidth = 0.3, color = '#ffffffcc'){
	context.save();
	context.lineWidth = lineWidth;

	context.beginPath();
	context.strokeStyle = color;
	context.arc(sun.x, sun.y, obj.orbit, 0, Math.PI * 2, false);
	context.stroke();

	context.restore();
};

//вращение на grad градусов и перерисовка
let setAngleAndRedraw = function(grad){

	//очистка canvas
	context.clearRect(0, 0, canvas.width, canvas.height); 

	//рисуем орбиты планет если флаг - true
	if(visibleOrbits) {
		drawOrbit(mercury);
		drawOrbit(venus);
		drawOrbit(earth);
		drawOrbit(mars);
		drawOrbit(jupiter);
		drawOrbit(saturn);
		drawOrbit(uran);
		drawOrbit(neptun);
	}

	//рисуем Солнце
	drawPlanet(sun);

	//отрисовка планет с поворотом на grad
	drawPlanet(mercury, grad);
	drawPlanet(venus, grad);
	drawPlanet(earth, grad);
	drawPlanet(mars, grad);
	drawPlanet(jupiter, grad);
	drawPlanet(saturn, grad);
	drawPlanet(uran, grad);
	drawPlanet(neptun, grad);
};



//подсчет прошедших лет на планетах
let yearCount = function(num){
	let yearMercury = document.getElementById('year_mercury');
	let yearVenus = document.getElementById('year_venus');
	let yearEarth = document.getElementById('year_earth');
	let yearMars = document.getElementById('year_mars');
	let yearJupiter = document.getElementById('year_jupiter');
	let yearSaturn = document.getElementById('year_saturn');
	let yearUran = document.getElementById('year_uran');
	let yearNeptun = document.getElementById('year_neptun');

	yearMercury.innerText = Math.floor(num*mercury.rotateRatio / 360);
	yearVenus.innerText = Math.floor(num*venus.rotateRatio / 360);
	yearEarth.innerText = (num*earth.rotateRatio / 360).toFixed(1);
	yearMars.innerText = (num*mars.rotateRatio / 360).toFixed(1);
	yearJupiter.innerText = (num*jupiter.rotateRatio / 360).toFixed(2);
	yearSaturn.innerText = (num*saturn.rotateRatio / 360).toFixed(2);
	yearUran.innerText = (num*uran.rotateRatio / 360).toFixed(3);
	yearNeptun.innerText = (num*neptun.rotateRatio / 360).toFixed(3);
};


		
//переключение видимости орбит - true/false
let toggleOrbitVisibility = function(){
	visibleOrbits = !visibleOrbits;
	setAngleAndRedraw(i); //отрисовать кадр независимо от паузы
};

//увеличение скорости вращения
let rotateSpeedPlus = function(){
	if(rotateSpeedIndex < rotateSpeedsArr.length-1){
		rotateSpeedIndex++;
		rotateSpeed = rotateSpeedsArr[rotateSpeedIndex];
	}
};

//уменьшение скорости вращения
let rotateSpeedMinus = function(){
	if(rotateSpeedIndex > 0){
		rotateSpeedIndex--;
		rotateSpeed = rotateSpeedsArr[rotateSpeedIndex];
	}
};

// остановка/возобновление вращения
let rotateSpeedTogglePause = function(){
	rotatePaused = !rotatePaused;
};



//рекурсивный цикл увеличения градусов поворота
// ПОТЕНЦИАЛЬНАЯ ПРОБЛЕМА - i увеличивается бесконечно
// i вынесена из функции, чтобы использоваться внутри toggleOrbitVisibility()

let i = 0;
let rotate = function(){

	function f(){

		//проверка стоит ли пауза
		if(!rotatePaused){
			i++;
			setAngleAndRedraw(i);
			yearCount(i);
		}

		setTimeout(f, rotateSpeed);
	}
	f();
};


export {
	rotate,
	rotateSpeedPlus,
	rotateSpeedMinus,
	rotateSpeedTogglePause,
	toggleOrbitVisibility
};

