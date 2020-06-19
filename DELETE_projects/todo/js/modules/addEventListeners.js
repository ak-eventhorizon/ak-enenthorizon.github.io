'use strict';

import {createItem} from './createItem.js';

import {putToLocalStorage} from './localStorage.js';
import {getFromLocalStorage} from './localStorage.js';
import {clearLocalStorage} from './localStorage.js';

// IN - object with list item parameters
// {
//     id: 1,
//     order: 1,
//     color: 'red' | 'yellow '| 'green' | 'blue' | 'none',
//     content: 'string up to 100 chars',
//     checked: false
//     target: false
// }

// OUT - undefined
// function add all needed event listeners on DOM element 'item-ID'

function addEventListenersOnItem(obj){

    let id = obj.id;  // id equal index inside aray

    //************ event listener on menu button ************
    let menuButton = document.getElementById(`menu_btn-${id}`);
    menuButton.onclick = function(){

        this.classList.toggle('menu-btn--clicked');

        let currentContextMenu = document.getElementById(`context_menu-${id}`);
        currentContextMenu.classList.toggle('context-menu--hidden');

        //hide color menu menu if it was opened
        let currentColorMenu = document.getElementById(`color_menu-${id}`);
        if(!currentColorMenu.classList.contains('color-menu--hidden')){
        currentColorMenu.classList.toggle('color-menu--hidden');
        }

        //close all other menus if they opened
        let tempListArr = getFromLocalStorage();
        for (let i = 1; i < tempListArr.length; i++) {
            if( i !== id && tempListArr[i] !== null) {
                let currentMenuBtn = document.getElementById(`menu_btn-${i}`);
                let currentContextMenu = document.getElementById(`context_menu-${i}`);
                let currentColorMenu = document.getElementById(`color_menu-${i}`);

                currentMenuBtn.classList = 'menu-btn';
                currentContextMenu.classList = 'context-menu context-menu--hidden';
                currentColorMenu.classList = 'color-menu color-menu--hidden';
            }
        }
    };

    //************ event listener on context-menu-delete button ************
    let deleteButton = document.getElementById(`context_btn_del-${id}`);
    deleteButton.onclick = function(){

        let currentItem = document.getElementById(`item-${id}`);
        currentItem.parentNode.removeChild(currentItem);

        let tempListArr = getFromLocalStorage();
        tempListArr[id] = null;
        putToLocalStorage(tempListArr);
    };

    //************ event listener on context-menu-target button ************
    let targetButton = document.getElementById(`context_btn_target-${id}`);
    targetButton.onclick = function(){

        let currentCheckTarget = document.getElementById(`check_target-${id}`);
        currentCheckTarget.classList.toggle('check-target--active');
        
        let tempListArr = getFromLocalStorage();
        tempListArr[id].target = !tempListArr[id].target;

        //close all other targets if they exist
        for (let i = 1; i < tempListArr.length; i++) {
            if( i !== id && tempListArr[i] !== null) {

                let currentCheckTarget = document.getElementById(`check_target-${i}`);
                if (currentCheckTarget.classList.contains('check-target--active')) {

                    currentCheckTarget.classList.toggle('check-target--active');
                    tempListArr[i].target = false;
                    break;
                }
            }
        }
        putToLocalStorage(tempListArr);
    };
    
    //************ event listener on context-menu-down button ************
    let downButton = document.getElementById(`context_btn_down-${id}`);
    downButton.onclick = function(){

        //нужно найти все элементы массива с атрибутом order больше текущего
        //из них узнать id элемента с самым маленьким order
        //поменять местами order-ы в стилях и в массиве 

        let tempListArr = getFromLocalStorage();

        //create array of objects with order higher then current order
        let listWithHigherOrders = [];
        for (let i = 1; i < tempListArr.length; i++) {
            if (tempListArr[i] !== null && tempListArr[i].order > tempListArr[id].order) {
                listWithHigherOrders.push(tempListArr[i]);
            } 
        }

        //sort array by orders ascending
        listWithHigherOrders.sort(function(a, b) {
            return a.order - b.order;
        });

        //if item with higher order exist
        if(listWithHigherOrders[0]){
            let nextItemId = listWithHigherOrders[0].id;
            let nextItem = document.getElementById(`item-${nextItemId}`);

            let currentItemId = id;
            let currentItem = document.getElementById(`item-${currentItemId}`);

            //swap orders in html
            [currentItem.style.order, nextItem.style.order] = 
            [nextItem.style.order, currentItem.style.order];

            //swap orders in localStorage
            [tempListArr[currentItemId].order, tempListArr[nextItemId].order] = 
            [tempListArr[nextItemId].order, tempListArr[currentItemId].order];
        }

        putToLocalStorage(tempListArr);  
    };

    //************ event listener on context-menu-up button ************
    let upButton = document.getElementById(`context_btn_up-${id}`);
    upButton.onclick = function(){

        //нужно найти все элементы массива с атрибутом order меньше текущего
        //из них узнать id элемента с самым большим order
        //поменять местами order-ы в стилях и в массиве 

        let tempListArr = getFromLocalStorage();

        //create array of objects with order lower then current order
        let listWithLowerOrders = [];
        for (let i = 1; i < tempListArr.length; i++) {
            if (tempListArr[i] !== null && tempListArr[i].order < tempListArr[id].order) {
                listWithLowerOrders.push(tempListArr[i]);
            } 
        }

        //sort array by orders descending
        listWithLowerOrders.sort(function(a, b) {
            return b.order - a.order;
        });

        //if item with lower order exist
        if(listWithLowerOrders[0]){
            let previousItemId = listWithLowerOrders[0].id;
            let previousItem = document.getElementById(`item-${previousItemId}`);

            let currentItemId = id;
            let currentItem = document.getElementById(`item-${currentItemId}`);

            //swap orders in html
            [currentItem.style.order, previousItem.style.order] = 
            [previousItem.style.order, currentItem.style.order];

            //swap orders in localStorage
            [tempListArr[currentItemId].order, tempListArr[previousItemId].order] = 
            [tempListArr[previousItemId].order, tempListArr[currentItemId].order];
        }

        putToLocalStorage(tempListArr);        
    };

    //************ event listener on context-menu-color button ************
    let colorButton = document.getElementById(`context_btn_color-${id}`);
    colorButton.onclick = function(){

        let currentColorMenu = document.getElementById(`color_menu-${id}`);
        currentColorMenu.classList.toggle('color-menu--hidden');
    };

    //************ event listener on color-change buttons ************
    let colorChangeRedButton = document.getElementById(`color_btn_red-${id}`);
    let colorChangeYellowButton = document.getElementById(`color_btn_yellow-${id}`);
    let colorChangeGreenButton = document.getElementById(`color_btn_green-${id}`);
    let colorChangeBlueButton = document.getElementById(`color_btn_blue-${id}`);

    let currentCheckArea = document.getElementById(`check_area-${id}`);

    colorChangeRedButton.onclick = function(){

        let tempListArr = getFromLocalStorage();

        if(currentCheckArea.classList.contains('check-area--red')){
            currentCheckArea.classList.value = 'check-area';
            tempListArr[id].color = 'none';
        } else {
            currentCheckArea.classList.value = 'check-area check-area--red';
            tempListArr[id].color = 'red';
        }

        putToLocalStorage(tempListArr);
    };

    colorChangeYellowButton.onclick = function(){

        let tempListArr = getFromLocalStorage();

        if(currentCheckArea.classList.contains('check-area--yellow')){
            currentCheckArea.classList.value = 'check-area';
            tempListArr[id].color = 'none';
        } else {
            currentCheckArea.classList.value = 'check-area check-area--yellow';
            tempListArr[id].color = 'yellow';
        }

        putToLocalStorage(tempListArr);
    };

    colorChangeGreenButton.onclick = function(){

        let tempListArr = getFromLocalStorage();

        if(currentCheckArea.classList.contains('check-area--green')){
            currentCheckArea.classList.value = 'check-area';
            tempListArr[id].color = 'none';
        } else {
            currentCheckArea.classList.value = 'check-area check-area--green';
            tempListArr[id].color = 'green';
        }

        putToLocalStorage(tempListArr);
    };

    colorChangeBlueButton.onclick = function(){

        let tempListArr = getFromLocalStorage();

        if(currentCheckArea.classList.contains('check-area--blue')){
            currentCheckArea.classList.value = 'check-area';
            tempListArr[id].color = 'none';
        } else {
            currentCheckArea.classList.value = 'check-area check-area--blue';
            tempListArr[id].color = 'blue';
        }

        putToLocalStorage(tempListArr);
    };

    //************ event listener on check box ************
    let checkBox = document.getElementById(`check_box-${id}`);
    checkBox.onclick = function(){

        this.classList.toggle('check-box--checked');
        let currentTextArea = document.getElementById(`text_area-${id}`);
        currentTextArea.toggleAttribute('readonly');

        let tempListArr = getFromLocalStorage();
        tempListArr[id].checked = !tempListArr[id].checked;
        putToLocalStorage(tempListArr);
    };

    //************ event listener on textarea change ************
    let textArea = document.getElementById(`text_area-${id}`);
    textArea.oninput = function(){

        let tempListArr = getFromLocalStorage();
        tempListArr[id].content = this.value;
        putToLocalStorage(tempListArr);
    };
}

//************ event listener on MAIN ADD button ************
function addEventListenersOnAddBtn() {

    let mainBtn = document.getElementById('main-btn');

    mainBtn.onclick = function(){

        let tempListArr = getFromLocalStorage();
        tempListArr[0]++;

        let newElement = {
            id: tempListArr[0],
            order: tempListArr[0],
            color: 'none',
            content: '',
            checked: false,
            target: false
        };

        tempListArr.push(newElement);
        putToLocalStorage(tempListArr);

        //create new element in DOM
        let elem = createItem(newElement);
        let list = document.getElementById('list');
        list.appendChild(elem);
        addEventListenersOnItem(newElement);
    };
}

//************ event listener on CLEAR ALL button ************
function addEventListenersOnClearBtn() {

    let clearBtn = document.getElementById('clear-btn');

    clearBtn.onclick = function(){

        if(confirm('THIS ACTION WILL DELETE ALL!\nARE YOU SURE?')){

            let list = document.getElementById(`list`);
            list.innerHTML = '';
        
            clearLocalStorage();
        }
    };
}

export {
    addEventListenersOnItem,
    addEventListenersOnAddBtn,
    addEventListenersOnClearBtn
};