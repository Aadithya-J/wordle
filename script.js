
async function getWords() {
  const response = await fetch('https://words.dev-apis.com/word-of-the-day/?random=1');
  const data = await response.json();
  return data;
}
var wordle;
getWords().then(data => {
    wordle = data
    console.log(wordle)
})





const words = document.querySelectorAll('.word');
let isListening = false;
let keydownHandler;

for (let i = 0; i < words.length; i++) {
  words[i].addEventListener('click', function() {
    Listen();
  });
}

function Listen() {
  if (!isListening) {
    console.log('Listening');
    isListening = true;
    keydownHandler = handleKeyDown;
    document.addEventListener('keydown', keydownHandler);
  }
}

function dontListen() {
  if (isListening) {
    console.log('Not Listening');
    document.removeEventListener('keydown', keydownHandler);
    isListening = false;
  }
}

document.addEventListener('click', function(event) {
  let isWordClicked = false;
  for (let i = 0; i < words.length; i++) {
    if (words[i].contains(event.target)) {
      isWordClicked = true;
      break;
    }
  }
  if (!isWordClicked) {
    dontListen();
  }
});


var currentWord = document.querySelector('.word1');
var index = 0;
function handleKeyDown(event) {
    if(isAlpha(event.key)){
        if(index <= 4){
            const currentLetter = currentWord.querySelector(`.letter-${index}`);
            currentLetter.textContent = event.key;
            index++;
        }
    }
    if(event.key == 'Backspace'){
        if(index > 0){
            index--;
            const currentLetter = currentWord.querySelector(`.letter-${index}`);
            currentLetter.textContent = '';
        }
    }
}


function isAlpha(char){
    return /^[A-Z]$/i.test(char);
}