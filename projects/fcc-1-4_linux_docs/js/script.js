'use strict';


// ******************** Add console-like banner ********************
let consoleBlock = document.getElementById('console');
let animationInProgress = false; // for multiple click restriction


function printConsole(string) {

    if (!animationInProgress) {
        animationInProgress = true;
        consoleBlock.innerHTML = '$' + string;
        consoleBlock.style.width = '1ch'; // set inline width = 1 character ($)
        consoleBlock.style.animation = 'none'; //disable CSS cursor animation

        for (let i = 1; i <= string.length; i++) {
            setTimeout(printOneCharacter, i * 100);
        }

        setTimeout(function () {
            consoleBlock.style.animation = ''; //enable CSS cursor animation 
            animationInProgress = false;
        }, string.length * 100);
    }
}


function printOneCharacter() {
    consoleBlock.style.width =
        parseInt(consoleBlock.style.width, 10) + 1 + 'ch';
}



// ******************* Add click handlers on nav-menu items *******************
let menuItems = document.getElementsByClassName('nav-link');

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].onclick = function () {
        printConsole('cd /' + this.innerText);
    };
}