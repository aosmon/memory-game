/*
 * Create a list that holds all of your cards
 */
let cardFaces = ['fa fa-diamond',
                 'fa fa-paper-plane-o',
                 'fa fa-anchor',
                 'fa fa-bolt',
                 'fa fa-cube',
                 'fa fa-leaf',
                 'fa fa-bicycle',
                 'fa fa-bomb'
                ];
cardFaces = cardFaces.concat(cardFaces);
let openCards = [];

let movesCounter = 0;
let moves = document.querySelector('.moves');
moves.textContent = movesCounter;
let starsCounter = 3;
let stars = document.querySelector('.stars');
const MATCH = 16;
let matchCounter = 0;
let time = 0;

let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);
let cards = document.getElementsByClassName('card');
let deck = document.querySelector('.deck');
//set up the event listener for a deck
deck.addEventListener('click', onCardClick);
//Initialize timer
//https://github.com/husa/timer.js/
let myTimer = new Timer({
  tick    : 1,
  ontick  : function(ms) { time++; }
});

displayCards();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards(){
  cardFaces = shuffle(cardFaces);

  for(let i=0; i<cardFaces.length;i++){
      let content = document.createElement('i');
      content.setAttribute('class', cardFaces[i]);
      cards[i].appendChild(content);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * When card is clicked
 *   - check if clicked element is card
 *   - check if clicked card is not matched already
 *   - add the card to a *list* of "open" cards
 *   - start Timer if not started
 */
function onCardClick(e){

  let timerStarted = false;

  if(e.target.classList.contains('card') && !e.target.classList.contains('match')){
    showSymbol(e.target);
    addToOpenCards(e.target);
  }
  //start timer
  if(!timerStarted){
    myTimer.start(1000);
  }

}

// Show card's face
function showSymbol(card){
    card.classList.add('open', 'show');
}

/*
 * Add the card to a *list* of "open" cards
 *   - if the list already has another card, check to see if the two cards match
 *   - if the cards do match, lock the cards in the open position
 *   - if the cards do not match, remove the cards from the list and hide the card's symbol
 *   - increment the move counter and display it on the page
 */
function addToOpenCards(card){
    if(openCards.length===1){
        if(openCards[0]===card){
            return;
        }
    }
    openCards.push(card);

    if(openCards.length>1){
        if(openCards[0].innerHTML===openCards[1].innerHTML){
            lockCardsOpen(openCards[0]);
            lockCardsOpen(openCards[1]);
            openCards = [];
        }else{
            hideSymbols(openCards[0], openCards[1]);
            openCards = [];
        }
        incrementCounter();
        updateScoreStars();
    }
}
/*
 * Lock the cards in the open position
 *   - Increment match counter
 *   - check if all cards are matched and end game
 */
function lockCardsOpen(card){
    card.classList.add('match');
    matchCounter++;
    if(matchCounter===MATCH){
        endGame();
    }
}


//Hide the card's symbol
function hideSymbols(card1, card2){
    card1.classList.add('wobble');
    card2.classList.add('wobble');
    setTimeout(function(){
        card1.setAttribute('class', 'card');
        card2.setAttribute('class', 'card');
    }, 1000)
}
//Increment the move counter and display it on the page
function incrementCounter(){
    movesCounter++;
    moves.textContent = movesCounter;
 }
//Update score stars and display it on the page
 function updateScoreStars(){
     if(movesCounter>9){

        starsCounter = 2; stars.children[2].firstElementChild.classList.remove('fa-star');
         stars.children[2].firstElementChild.classList.add('fa-star-o');
     }
     if(movesCounter>14){

        starsCounter = 1; stars.children[1].firstElementChild.classList.remove('fa-star');
         stars.children[1].firstElementChild.classList.add('fa-star-o');
     }
     if(movesCounter>20){

        starsCounter = 0; stars.children[0].firstElementChild.classList.remove('fa-star');
         stars.children[0].firstElementChild.classList.add('fa-star-o');
     }
 }
// Restart game and reset all stats
function restartGame(){
    movesCounter = 0;
    matchCounter = 0;
    cardFaces = shuffle(cardFaces);
    //Reset/Hide cardFaces
    moves.textContent = movesCounter;
    for(let i=0; i<cardFaces.length;i++){
        cards[i].firstElementChild.remove();
        cards[i].setAttribute('class', 'card');
    }
    //Reset stars
    stars.children[0].firstElementChild.setAttribute('class', 'fa fa-star');
    stars.children[1].firstElementChild.setAttribute('class', 'fa fa-star');
    stars.children[2].firstElementChild.setAttribute('class', 'fa fa-star');

    //Reset timer
    time = 0;
    myTimer.stop();
    timerStarted = false;

    displayCards();
}
/*
 * End game
 *   - display modal with game statistics
 *   - restart game
 */

function endGame() {
	setTimeout(function(){
        let modal = document.getElementById("modal");
        modal.style.visibility = "visible";
        document.querySelector('.win-results').textContent = 'With '+movesCounter+' Moves and '+ starsCounter+' Stars. Time: '+ time +'ms.';
        document.querySelector('.play-again').addEventListener('click', function(){
          modal.style.visibility = "hidden";
          restartGame();
        });
    }, 1000);
}
