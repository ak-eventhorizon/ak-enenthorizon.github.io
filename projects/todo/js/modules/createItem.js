'use strict';

// IN - object with list item parameters
// {
//     id: 1,
//     order: 1,
//     color: 'red' | 'yellow '| 'green' | 'blue' | 'none',
//     content: 'string up to 100 chars',
//     checked: false,
//     target: false
// }


// OUT - DOM element 'item-ID'
/* <div id="item-1" class="item" style="order: 1;">

<div id="check_area-1" class="check-area check-area--red">
    <div id="check_target-1" class="check-target"></div>
    <div id="check_box-1" class="check-box"></div>
</div>

<textarea id="text_area-1" class="text-area" spellcheck="false" maxlength="100">string up to 100 chars</textarea>

<div id="menu_btn-1" class="menu-btn"></div>

<div id="context_menu-1" class="context-menu context-menu--hidden">
    <div id="context_btn_del-1" class="context-btn context-btn--del"></div>
    <div id="context_btn_target-1" class="context-btn context-btn--target"></div>
    <div id="context_btn_down-1" class="context-btn context-btn--down"></div>
    <div id="context_btn_up-1" class="context-btn context-btn--up"></div>
    <div id="context_btn_color-1" class="context-btn context-btn--color"></div>
</div>

<div id="color_menu-1" class="color-menu color-menu--hidden">
    <div id="color_btn_red-1" class="color-btn color-btn--red"></div>
    <div id="color_btn_yellow-1" class="color-btn color-btn--yellow"></div>
    <div id="color_btn_green-1" class="color-btn color-btn--green"></div>
    <div id="color_btn_none-1" class="color-btn color-btn--blue"></div>
</div>

</div> */

function createItem(obj){
    let id = obj.id; // num
    let order = obj.order; // num
    let color = obj.color; // 'red' 'yellow' 'green' 'blue' 'none'
    let content = obj.content; // string
    let checked = obj.checked; // boolean
    let target = obj.target; // boolean

    let item = document.createElement('div');
    item.id = `item-${id}`;
    item.className = 'item';
    item.style.order = order;

    let checkArea = document.createElement('div');
    checkArea.id = `check_area-${id}`;
    switch (color) {
        case 'red': 
            checkArea.classList = 'check-area check-area--red';
            break;
        case 'yellow': 
            checkArea.classList = 'check-area check-area--yellow';
            break;
        case 'green': 
            checkArea.classList = 'check-area check-area--green';
            break;
        case 'blue':
            checkArea.classList = 'check-area check-area--blue';
            break;
        case 'none': 
            checkArea.classList = 'check-area';
            break;
    }

    let checkTarget = document.createElement('div');
    checkTarget.id = `check_target-${id}`;
    checkTarget.classList = 'check-target';

    if(target) {
        checkTarget.classList.toggle('check-target--active');
    }

    checkArea.appendChild(checkTarget);

    let checkBox = document.createElement('div');
    checkBox.id = `check_box-${id}`;
    checkBox.classList = 'check-box';

    if(checked){
        checkBox.classList.toggle('check-box--checked');
    }

    checkArea.appendChild(checkBox);

    item.appendChild(checkArea);

    let textArea = document.createElement('textarea');
    textArea.id = `text_area-${id}`;
    textArea.className = 'text-area';
    textArea.spellcheck = false;
    textArea.maxLength = 100;
    textArea.readOnly = checked ? true : false;
    textArea.value = content;

    item.appendChild(textArea);

    let menuBtn = document.createElement('div');
    menuBtn.id = `menu_btn-${id}`;
    menuBtn.className = 'menu-btn';

    item.appendChild(menuBtn);

    let contextMenu = document.createElement('div');
    contextMenu.id = `context_menu-${id}`;
    contextMenu.classList = 'context-menu context-menu--hidden';

    let contextButtonDel = document.createElement('div');
    let contextButtonTarget = document.createElement('div');
    let contextButtonDown = document.createElement('div');
    let contextButtonUp = document.createElement('div');
    let contextButtonColor = document.createElement('div');

    contextButtonDel.id = `context_btn_del-${id}`;
    contextButtonDel.classList = 'context-btn context-btn--del';

    contextButtonTarget.id = `context_btn_target-${id}`;
    contextButtonTarget.classList = 'context-btn context-btn--target';

    contextButtonDown.id = `context_btn_down-${id}`;
    contextButtonDown.classList = 'context-btn context-btn--down';

    contextButtonUp.id = `context_btn_up-${id}`;
    contextButtonUp.classList = 'context-btn context-btn--up';

    contextButtonColor.id = `context_btn_color-${id}`;
    contextButtonColor.classList = 'context-btn context-btn--color';

    contextMenu.appendChild(contextButtonDel);
    contextMenu.appendChild(contextButtonTarget);
    contextMenu.appendChild(contextButtonDown);
    contextMenu.appendChild(contextButtonUp);
    contextMenu.appendChild(contextButtonColor);

    item.appendChild(contextMenu);

    let colorMenu = document.createElement('div');
    colorMenu.id = `color_menu-${id}`;
    colorMenu.classList = 'color-menu color-menu--hidden';

    let colorButtonRed = document.createElement('div');
    let colorButtonYellow = document.createElement('div');
    let colorButtonGreen = document.createElement('div');
    let colorButtonBlue = document.createElement('div');

    colorButtonRed.id = `color_btn_red-${id}`;
    colorButtonRed.classList = 'color-btn color-btn--red';

    colorButtonYellow.id = `color_btn_yellow-${id}`;
    colorButtonYellow.classList = 'color-btn color-btn--yellow';

    colorButtonGreen.id = `color_btn_green-${id}`;
    colorButtonGreen.classList = 'color-btn color-btn--green';

    colorButtonBlue.id = `color_btn_blue-${id}`;
    colorButtonBlue.classList = 'color-btn color-btn--blue';

    colorMenu.appendChild(colorButtonRed);
    colorMenu.appendChild(colorButtonYellow);
    colorMenu.appendChild(colorButtonGreen);
    colorMenu.appendChild(colorButtonBlue);

    item.appendChild(colorMenu);

    return item;
}



export {createItem};