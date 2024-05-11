
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
var wordIndex = 1;
var index = 0;
async function handleKeyDown(event) {
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
    if(event.key == 'Enter'){
        if(await ValidateWord()){
            const userWord = getUserWord();
            for(let i =0;i < 5;i++){
                const currentLetter = currentWord.querySelector(`.letter-${i}`);
                if(currentLetter.textContent == wordle.word[i]){
                    currentLetter.style.backgroundColor = 'green';
                }
                else if(wordle.word.includes(currentLetter.textContent)){
                    currentLetter.style.backgroundColor = 'yellow';
                }
                else{
                    currentLetter.style.backgroundColor = 'gray';
                }
            }
            console.log(wordle.word);
            if(wordle.word == userWord){
                alert('You Win');
                console.log('You Win')
            }
            else{
                if(wordIndex == 5){
                    alert('You Lose');
                    console.log('You Lose')
                }
                else{
                    wordIndex+=1;
                    currentWord = document.querySelector(`.word${wordIndex}`);
                    index = 0;
                    console.log(currentWord);
                }
            }
        }
        else{
            for(let i = 0;i < 5;i++){
                const currentLetter = currentWord.querySelector(`.letter-${i}`);
                currentLetter.style.animation = "flash 1s 1"
                setTimeout(function(){
                    currentLetter.style.animation = "";
                }, 1000)
            }
        }
    }
}
async function ValidateWord(){
    const userWord = getUserWord();
    const posturl = "https://words.dev-apis.com/validate-word"
    const data = {
        word: userWord
    }
    const sdata = JSON.stringify(data);
    const response = await fetch(posturl, {
        method: 'POST',
        body: sdata
    });
    const bool = JSON.parse(await response.text()).validWord;
    console.log(bool);
    return bool;
}

function getUserWord(){
    var word = '';
    for(let i =0;i < 5;i++){
        const currentLetter = currentWord.querySelector(`.letter-${i}`);
        word += currentLetter.textContent;
    }
    return word;
}
function isAlpha(char){
    return /^[A-Z]$/i.test(char);
}