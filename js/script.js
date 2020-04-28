'use strict';

const stars = {
    radiuses: [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
    areolas: [2,3,4,5,6,7,8],

    radiusesDominant: [10,15,20,25,30],
    areolasDominant: [30,40,50,60,70,80,90,100],

    colors: ['#ffffff','#c8c8c8','#fff4fe','#faf0db','#fbf9ff'],
};



function randomFromZeroTo(number){
    return Math.floor(Math.random() * number);
}

function randomElementFrom(array) {
    let randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
}



let canvas = document.getElementById('bg-stars-layer');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth; // set canvas width as viewport width
ctx.canvas.height = window.innerHeight; // set canvas height as viewport height

let canvas2 = document.getElementById('bg-blackhole-layer');
let ctx2 = canvas2.getContext('2d');
ctx2.canvas.width  = canvas2.clientWidth; // set canvas width as block width
ctx2.canvas.height = canvas2.clientHeight; // set canvas height as block height


// create ordinary stars
function generateOrdinaryStars(number) {

    let x,y,r,color;

    for (let i = 0; i < number; i++) {
        x = randomFromZeroTo(canvas.width);
        y = randomFromZeroTo(canvas.height);
        r = randomElementFrom(stars.radiuses);
        color = randomElementFrom(stars.colors);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x,y,r,0,2*Math.PI); // arc(x, y, r, startAngle, endAngle)
        ctx.fill();
    }
}

// create stars with areola
function generateGradientStars(number) {

    let x,y,r,areol,color;

    for (let i = 0; i < number; i++) {
        x = randomFromZeroTo(canvas.width);
        y = randomFromZeroTo(canvas.height);
        r = randomElementFrom(stars.radiuses);
        areol = randomElementFrom(stars.areolas);
        color = randomElementFrom(stars.colors);

        // Create gradient stars
        let grd = ctx.createRadialGradient(x,y,r, x,y,r*areol); // (x0, y0, r0, x1, y1, r1);
        grd.addColorStop(0, color);
        grd.addColorStop(1,"transparent");

        // Fill canvas with gradient stars
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // fillRect(x, y, width, height) 
    }
}

// create few dominant stars
function generateDominantStars(number) {

    let x,y,r,areol,color;

    for (let i = 0; i < number; i++) {
        x = randomFromZeroTo(canvas.width);
        y = randomFromZeroTo(canvas.height);
        r = randomElementFrom(stars.radiusesDominant);
        areol = randomElementFrom(stars.areolasDominant);
        color = randomElementFrom(stars.colors);

        // Create gradient stars
        let grd = ctx.createRadialGradient(x,y,r, x,y,r+areol); // (x0, y0, r0, x1, y1, r1);
        grd.addColorStop(0, color);
        grd.addColorStop(1,"transparent");

        // Fill canvas with gradient stars
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // fillRect(x, y, width, height) 
    }    
}

// create Black hole
function generateBlackHole() {

    let x = ctx2.canvas.width / 2;
    let y = ctx2.canvas.height / 2;
    
    let r = x > y ? y*0.75 : x*0.75; // black hole radius will 3/4 of min size 

    let grd = ctx2.createRadialGradient(x,y,r, x,y,r*1.33); 
    grd.addColorStop(0, 'black');
    grd.addColorStop(0.7, 'black');
    grd.addColorStop(0.71, 'white');
    grd.addColorStop(1,'transparent');
    ctx2.fillStyle = grd;
    ctx2.fillRect(0, 0, canvas.width, canvas.height);
}

// refresh width/height & clear canvases
function refreshCanvas() {
    ctx.canvas.width  = window.innerWidth; 
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx2.canvas.width  = canvas2.clientWidth;
    ctx2.canvas.height = canvas2.clientHeight;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

//create background depends screen resolution
function createBackground(){

    refreshCanvas();

    let bg = document.getElementById('bg-stars-layer');
    let screenArea = bg.height*bg.width;

    if (screenArea < 786000) {
        // smaller than 1024x768 (mobiles, middle laptops, iPad)
        generateOrdinaryStars(1000);
        generateGradientStars(10);
        generateDominantStars(1);
        generateBlackHole();
    } else { 
        // bigger than 1024x768 (iPad Pro, big laptops, 4k)
        generateOrdinaryStars(4000);
        generateGradientStars(30);
        generateDominantStars(3);
        generateBlackHole();
    }    
}


window.addEventListener('load', createBackground);
window.addEventListener('resize', createBackground);