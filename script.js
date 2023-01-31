const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessRemaning = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, totalGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    totalGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessRemaning.innerText = totalGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    let start = 0;
    let end = word.length-1;
    while(start <= end){
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            let start = 0;
            let end = word.length-1;
            while(start <= end){
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }


        } else {
            totalGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessRemaning.innerText = totalGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats!  ${word.toUpperCase()}`);
            return randomWord();
        } else if(totalGuesses < 1) {
            alert("Game over!");

            let start = 0;
            let end = word.length-1;
            while(start <= end){
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());