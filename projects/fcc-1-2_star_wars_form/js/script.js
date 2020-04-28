//*****************************************************************************************
//*************************** STAR WARS Titles Effect Animation ***************************
//*****************************************************************************************

const sw_title = document.getElementById('sw-title');  // трехмерная плоскость, по которой движется текст
const sw_title_content = document.getElementById('sw-title-content'); // контент, который движется по плоскости
const contentStyle = sw_title_content.style;

let flowPos = sw_title.clientHeight; // переменная для позиционирования контента

let currentSpeed = 1; // текущая скорость анимации
let saveSpeedState; // переменная для сохранения значения скорости при паузе



//управление анимацией: 
// key = '+' ускорение в два раза; 
// key = '-' замедление в два раза; 
// key = 'pause' - старт/стоп
function animSpeedControl(key) {
	switch(key) {
		case '+':
			currentSpeed = currentSpeed * 2;
			break;
		case '-':
			currentSpeed = currentSpeed / 2;
			break;
		case 'pause':
			if (currentSpeed === 0) {
				currentSpeed = saveSpeedState;
			} else {
				saveSpeedState = currentSpeed;
				currentSpeed = 0;
			}
			break;
	}
}



// сдвиг контента на один шаг
function moveContent(step) {
	flowPos -= step;
	contentStyle.top = flowPos + 'px';

	//когда движение достигает предела контента - контент возвращается в исходную точку
	if (flowPos < -sw_title_content.clientHeight) {
		flowPos = sw_title.clientHeight;
	}
};

function init () {
	moveContent(currentSpeed); // скорость анимации = currentSpeed пикселей за фрейм (частота - 60 фреймов в секунду)
	requestAnimationFrame(init);
}


requestAnimationFrame(init);