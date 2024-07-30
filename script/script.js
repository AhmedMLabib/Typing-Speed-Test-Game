// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scale",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
// setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// default level
// let defaultLevelName = "Easy";
// let defaultLevelSeconds = lvls[defaultLevelName];

// select elements

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

let mainStartDiv = document.querySelector(".start-div");
let allButtons = document.querySelectorAll(".start-div > div");

let defaultLevelName = "";
let defaultLevelSeconds = "";

allButtons.forEach((button) => {
  button.onclick = function () {
    mainStartDiv.classList.add("hidden");
    defaultLevelName = button.dataset.value;
    defaultLevelSeconds = lvls[defaultLevelName];

    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;

    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = words.length;
  };
});

// disable past event
input.onpaste = function () {
  return false;
};

// start game
startButton.onclick = function () {
  this.remove();
  input.classList.remove("hidden");
  input.focus();
  // generate word function
  genWords();
};

function genWords() {
  // get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  // show random word
  theWord.innerHTML = randomWord;
  // empty upcoming words
  upcomingWords.innerHTML = "";
  // generate upcoming words
  for (let i = 0; i < words.length; i++) {
    upcomingWords.innerHTML += `<div>${words[i]}</div>`;
  }
  // call start Play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // stop timer
      clearInterval(start);
      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // empty input
        input.value = "";
        // increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // call generate word function
          genWords();
        } else {
          finishMessage.innerHTML = `<span class="good">congratulation</span>`;
          // remove upcoming box
          upcomingWords.remove();
        }
      } else {
        finishMessage.innerHTML = `<span class="bad">Game Over</span>`;
      }
    }
  }, 1000);
}
