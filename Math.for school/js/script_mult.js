'use strict'

let buttonStart = document.getElementById('start');
let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
let question = document.getElementById('question');
let trueOrError = document.getElementById('trueOrError');
let answer1 = document.querySelector('.answer1');
let answer2 = document.querySelector('.answer2');
let answer3 = document.querySelector('.answer3');
let clickableAnswers = [answer1, answer2, answer3];

let picturesWrapper = document.querySelector('.picturesWrapper');
let starWrapper = document.createElement('div');
let starImg = document.createElement('img');

buttonStart.addEventListener('click', startGame);

let correctAnswer;
let scoreCounter = 0;

function startGame() {
    buttonStart.removeEventListener('click', startGame);
    question.innerHTML = '?';
    trueOrError.innerHTML = '';

    if(starWrapper) {
        starImg.remove();
    }

    for (let elem of clickableAnswers) {
        elem.classList.remove('wrong');
    }

    num1.innerHTML = Math.floor(Math.random() * 9 + 1);
    num2.innerHTML = Math.floor(Math.random() * 9 + 1);

    correctAnswer = Number(num1.innerHTML) * Number(num2.innerHTML);

    let wrongAnswer1 = Math.floor(Math.random() * 40 + 1);
    while (wrongAnswer1 == correctAnswer) {
        wrongAnswer1 = Math.floor(Math.random() * 40 + 1);
    }

    let wrongAnswer2 = Math.floor(Math.random() * 40 + 1);
    while (wrongAnswer2 == wrongAnswer1 || wrongAnswer2 == correctAnswer) {
        wrongAnswer2 = Math.floor(Math.random() * 40 + 1);
    }

    let allAnswers = [correctAnswer, wrongAnswer1, wrongAnswer2];
    let shuffledAnswers = []

    //перемешать массив ответов
    while (allAnswers.length > 0) {
        let rand = Math.floor(Math.random() * allAnswers.length);
        let x = allAnswers.splice(rand, 1);
        shuffledAnswers.push(x[0]);
    }

    answer1.innerHTML = shuffledAnswers[0];
    answer2.innerHTML = shuffledAnswers[1];
    answer3.innerHTML = shuffledAnswers[2];

    function checkAnswer() {
        question.innerHTML = correctAnswer;

        if (this.innerHTML == correctAnswer) {
            scoreCounter++;
            trueOrError.innerHTML = 'Верно!';
            trueOrError.style.color = 'var(--violet-color)';

            picturesWrapper.append(starWrapper);
            starWrapper.classList.add('star');
            starWrapper.append(starImg);
            starImg.src = 'imgs/star.png';

            score.innerHTML = scoreCounter;
        } else {
            this.classList.add('wrong');
            trueOrError.innerHTML = 'Ошибка!';
            trueOrError.style.color = 'var(--red-color)';
        }

        clickableAnswers.forEach(function(elem) {
            elem.removeEventListener('click', checkAnswer);
        })

        buttonStart.addEventListener('click', startGame);
    } 

    clickableAnswers.forEach(function(elem) {
        elem.addEventListener('click', checkAnswer);
    })
}    

// pictures-seasons

let currentMonth = new Date().getMonth();
let allImages = document.querySelectorAll('.season img');

if(currentMonth == 11 || currentMonth == 0 || currentMonth == 1) {
    for(let i=0; i<=3; i++) {
        allImages[i].src = `imgs/winter${i}.png`;
    }
} else if(currentMonth == 2 || currentMonth == 3 || currentMonth == 4) {
    for(let i=0; i<=3; i++) {
        allImages[i].src = `imgs/spring${i}.png`;
    }
} else if(currentMonth == 5 || currentMonth == 6 || currentMonth == 7) {
    for(let i=0; i<=3; i++) {
        allImages[i].src = `imgs/summer${i}.png`;
    }
} else {
    for(let i=0; i<=3; i++) {
        allImages[i].src = `imgs/autumn${i}.png`;
    }
}