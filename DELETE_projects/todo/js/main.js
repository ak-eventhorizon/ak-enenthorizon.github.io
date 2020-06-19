'use strict';

import {createItem} from './modules/createItem.js';

import {addEventListenersOnItem} from './modules/addEventListeners.js';
import {addEventListenersOnAddBtn} from './modules/addEventListeners.js';
import {addEventListenersOnClearBtn} from './modules/addEventListeners.js';

import {initializeLocalStorage} from './modules/localStorage.js';
import {putToLocalStorage} from './modules/localStorage.js';
import {getFromLocalStorage} from './modules/localStorage.js';
import {clearLocalStorage} from './modules/localStorage.js';


//************* localStorage, interface and App state initialize **************
//******************************************************************************

initializeLocalStorage();
addEventListenersOnAddBtn();
addEventListenersOnClearBtn();

let tempListArr = getFromLocalStorage();
let list = document.getElementById('list');

for (let i = 1; i < tempListArr.length; i++) {
    if(tempListArr[i] !== null) {
        let elem = createItem(tempListArr[i]);
        list.appendChild(elem);
        addEventListenersOnItem(tempListArr[i]);
    }
}