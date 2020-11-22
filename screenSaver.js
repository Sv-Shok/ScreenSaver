const imgArr = [
    'https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560',
    'https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400',
    'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
    'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060',
    'https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260',
    'https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500',
    'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];


let delayOption = 10000;
let intervalOption = 5000;

document.getElementById('delay').addEventListener('change', (e)=>{
    delayOption = e.target.value;
});

document.getElementById('interval').addEventListener('change', (e)=>{
    intervalOption = e.target.value;
});

let btn =  document.getElementById('btn')
btn.addEventListener('click', setOptionsTime);

function setOptionsTime(){
    if(delayOption < 1000){
        delayOption *= 1000;
    }
    if(intervalOption < 1000){
        intervalOption *=1000;
    }
    
};

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const createImgElem =  () => {
    let randImgUrl = randomInteger(0, imgArr.length - 1);
    let root = document.getElementById('root');
    root.insertAdjacentHTML('beforeend', `<img src= ${imgArr[randImgUrl]} class="imageSaver">`);
    let imageSaver = document.querySelector('.imageSaver');

    imageSaver.onload = function () {
        setCoords(imageSaver);
    }

};

///////////////////////////////////////////////////
function setCoords(elem) {
    let windowHeight = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    let elemWidth = elem.naturalWidth;
    let elemHeight = elem.naturalHeight;

    let cordX;
    let rangeX;
    if (elemWidth >= windowWidth) {
        elem.style.width = windowWidth + 'px';
        rangeX = 0;
    } else {
        cordX = windowWidth - elemWidth;
        rangeX = randomInteger(0, cordX);
    }

    let cordY;
    let rangeY;
    if (elemHeight >= windowHeight) {
        elem.style.height = windowHeight + 'px';
        rangeY = 0;
    } else {
        cordY = windowHeight - elemHeight;
        rangeY = randomInteger(0, cordY);
    }

    elem.style.position = "fixed";
    elem.style.left = rangeX + 'px';
    elem.style.top = rangeY + 'px';
    elem.style.animation = 'show 1s ease-out';
};
//////////////////////////////////////////////////

let timerDaley;
let timerInterval;
let timerRemove;

const timingStart = (timeD, timeI) => {

    timerInterval =  setTimeout(
        function setInterval() {
        document.querySelector('.blind').classList.add("showBlind");
        let imageSaver = document.querySelector('.imageSaver');

           if (imageSaver) {
            imageSaver.classList.add("show");
            imageSaver.addEventListener("animationend", ()=>{
                imageSaver.style.animation = 'hid 1s ease-out';
            
                timerRemove = setTimeout(()=>{
                    imageSaver.remove();
                },1000);
            });
        } else {
           createImgElem();
        }

        timerInterval = setTimeout(setInterval, timeI);
    }, timeI);

    function disableScreenSaver() {
       let img =  document.querySelector('.imageSaver');
        document.querySelector('.blind').classList.remove("showBlind");
        img && img.remove();
        clearTimeout(timerInterval);
        clearTimeout(timerDaley);
        clearTimeout(timerRemove);
        timerDaley = setTimeout(()=>{
            timingStart(delayOption, intervalOption);
        },timeD)
       
    }
    document.addEventListener("keydown", disableScreenSaver);
    document.addEventListener("mousemove", disableScreenSaver);
    btn.addEventListener('mousedown', disableScreenSaver);
};


timingStart(delayOption, intervalOption);

