'use strict';

function initializeLocalStorage(){
    if(!localStorage.toDoList){
        localStorage.toDoList = '[0]';
    }
}

function putToLocalStorage(obj){
    localStorage.setItem('toDoList', JSON.stringify(obj));
}

function getFromLocalStorage() {
    let obj = JSON.parse(localStorage.getItem('toDoList'));
    return obj;
}

function clearLocalStorage(){
    localStorage.toDoList = '[0]';
}

export {
    initializeLocalStorage,
    putToLocalStorage,
    getFromLocalStorage,
    clearLocalStorage
};