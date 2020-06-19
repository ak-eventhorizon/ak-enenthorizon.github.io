'use strict';

import * as starsBackground from './modules/stars_background.js';
import * as solarSystem from './modules/solar_system.js';



window.onload = function(){
	starsBackground.createStarsBackground('stars_bg', 1400, 14);
	solarSystem.rotate();
};



// *********CONTROLS*********

document.getElementById('speed_plus').onclick = function(){
	solarSystem.rotateSpeedPlus();
};

document.getElementById('speed_pause').onclick = function(){
	document.getElementById('speed_pause').classList.toggle('paused');
	solarSystem.rotateSpeedTogglePause();
};

document.getElementById('speed_minus').onclick = function(){
	solarSystem.rotateSpeedMinus();
};

document.getElementById('disable_orbits').onclick = function(){
	document.getElementById('disable_orbits').classList.toggle('disabled');
	solarSystem.toggleOrbitVisibility();
};

document.getElementById('info_toggle').onclick = function(){
	document.getElementById('info_toggle').classList.toggle('disabled');
	document.getElementById('info').classList.toggle('transparent');
};