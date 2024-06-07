const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
   // Resetting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src =`images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => ` <li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //selecting a random word and hint from the wordlist
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    
}

const gameOver = (isVictory) => {
    //afeter 600ms of game complets . ahowing model with relvant detils
    setTimeout(() => {
        const modalText = isVictory ? `You Found The Word:`: `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ?`victory` : `lost` }.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ?`congrats` : `Game Over` }`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    //checking if clickedLeter is exist on currentWord
    if(currentWord.includes(clickedLetter)){
       [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter) {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
       })
    } else {
        //if clicked letter dosent exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src =`images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

    //calling game over function if any of these conditions meets
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}
// create a keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button  = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord)