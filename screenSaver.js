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
let inputDaley;
let inputInterval;

document.getElementById('delay').addEventListener('change', (e) => {
    inputDaley = e.target.value;
});

document.getElementById('interval').addEventListener('change', (e) => {
    inputInterval = e.target.value;
});

let btn = document.getElementById('btn');


function setOptionsTime() {
    if (inputDaley && inputDaley < 1000) {
        delayOption = inputDaley *= 1000;
    }
    if (inputInterval && inputInterval < 1000) {
        intervalOption = inputInterval *= 1000;
    }
};

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const createImgElem = () => {
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
};


let timerDaley;
let timerInterval;

const timingIntervalStart = () => {
    if (!timerDaley) {
        clearAndPlaningDaley();
    } else {
        timerInterval = setTimeout(function run() {
            let img = document.querySelector('.imageSaver');
            if (img) {
                removeImg(img).then(() => {
                    createImgElem();
                    showImage();
                })
            }
            timerInterval = setTimeout(run, intervalOption)
        }, intervalOption);
    }
};

function showImage() {
    let imageSaver = document.querySelector('.imageSaver');
    imageSaver.classList.add("show");
    imageSaver.style.animation = 'show 0.5s ease-out';
}

function removeImg(imgRemove) {
    imgRemove.style.animation = 'hid 0.5s ease-out';
    return new Promise(resolve => setTimeout(() => resolve(imgRemove.remove()), 500));
}

function clearAndPlaningDaley() {
    timerDaley && clearTimeout(timerDaley);
    timerInterval && clearTimeout(timerInterval);
    timerInterval = null;
    let img = document.querySelector('.imageSaver');
    img && img.remove();
    document.querySelector('.blind').classList.remove("showBlind");
    timerDaley = setTimeout(() => {
        document.querySelector('.blind').classList.add("showBlind");
        if (!timerInterval) {
            createImgElem();
            showImage();
        }
        timingIntervalStart();
    }, delayOption)
}

btn.addEventListener('click', () => {
    setOptionsTime();
    clearAndPlaningDaley();
});
document.addEventListener("keydown", clearAndPlaningDaley);
document.addEventListener("mousemove", clearAndPlaningDaley);

timingIntervalStart();