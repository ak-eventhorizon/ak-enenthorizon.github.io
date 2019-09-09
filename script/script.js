	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.lineWidth = 0.3;

	//соотношение орбит и радиусов планет в этой группе 1:1

	let sun = {x: 500, y: 500, radius: 50, color: '#f5de5d'};
	let mercury = {x: 557, y: 500, radius: 2.5, color: '#a6a4a2', orbit: 57};
	let venus = {x: 608, y: 500, radius: 9.5, color: '#e0c396', orbit: 108};
	let earth = {x: 650, y: 500, radius: 10, color: '#abd4d0',orbit: 150};
	let mars = {x: 728, y: 500, radius: 5, color: '#873e2e',orbit: 228};


	//соотношение радиусов планет в этой группе относительно первой группы 3:1
	//орбиты аутентичного соотношения не имеют

	let jupiter = {x: 820, y: 500, radius: 35, color: '#ceb193',orbit: 320};
	let saturn = {x: 890, y: 500, radius: 30, color: '#e0d8cc',orbit: 390};
	let uran = {x: 945, y: 500, radius: 15, color: '#3994e3',orbit: 445};
	let neptun = {x: 980, y: 500, radius: 14, color: '#05459e',orbit: 480};




	//вращение на grad градусов
	let rotateStep = function(grad){

		//очистка canvas
		context.clearRect(0, 0, canvas.width, canvas.height); 

		//рисуем солнце
		context.beginPath();
		context.fillStyle = sun.color;
		context.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2, false);
		context.fill();

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


		//*******отрисовка планет со смещением grad*******
		//************************************************

		//********************Меркурий********************
		//отношение года на Земле к году на Меркурии = 4.1

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 4.1); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = mercury.color;
		context.arc(mercury.x, mercury.y, mercury.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Венера********************
		//отношение года на Земле к году на Венере = 1.6

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 1.6); //повернуть контекст на grad*4,1 градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = venus.color;
		context.arc(venus.x, venus.y, venus.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Земля********************

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = earth.color;
		context.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Марс********************
		//отношение года на Земле к году на Марсе = 0.5

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 0.5); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = mars.color;
		context.arc(mars.x, mars.y, mars.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Юпитер********************
		//отношение года на Земле к году на Юпитере = 0.085

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 0.085); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = jupiter.color;
		context.arc(jupiter.x, jupiter.y, jupiter.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Сатурн********************
		//отношение года на Земле к году на Сатурну = 0.0365

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 0.0365); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = saturn.color;
		context.arc(saturn.x, saturn.y, saturn.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Уран********************
		//отношение года на Земле к году на Уране = 0.0121

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 0.0121); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = uran.color;
		context.arc(uran.x, uran.y, uran.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

		//********************Нептун********************
		//отношение года на Земле к году на Нептуне = 0.006

		context.save(); //сохранить состояние контекста
		context.translate(sun.x, sun.y); //сместить центр отсчета в центр солнца
		context.rotate(Math.PI / 180 * grad * 0.006); //повернуть контекст на grad градусов относительно центра по часовой
		context.translate(-sun.x, -sun.y); //вернуть центр отсчета в начало координат

		//рисуем планету
		context.beginPath();
		context.fillStyle = neptun.color;
		context.arc(neptun.x, neptun.y, neptun.radius, 0, Math.PI * 2, false);
		context.fill();
		
		context.restore(); //восстановить состояние контекста

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
			if(i%360 === 0){console.log('Еще год!')}

			setTimeout(f, speed);
		}
		f();
	};

	//инициализация первого кадра
	rotateStep(0);

	//запуск вращения
	rotate(10);