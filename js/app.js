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
let stars = document.querySelector('.stars');

let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);
let cards = document.getElementsByClassName('card');
let deck = document.querySelector('.deck');
deck.addEventListener('click', onCardClick);

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

function onCardClick(e){
        if(e.target.classList.contains('card')){
            if(!e.target.classList.contains('match')){
                showSymbol(e.target);
                addToOpenCards(e.target);
            }
        }
    }

function showSymbol(card){
    card.classList.add('open', 'show');
}

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

function lockCardsOpen(card){
    card.classList.add('match');
}

function hideSymbols(card1, card2){
    card1.classList.add('wobble');
    card2.classList.add('wobble');    
    setTimeout(function(){
        card1.setAttribute('class', 'card');
        card2.setAttribute('class', 'card');
    }, 1000)
}

function incrementCounter(){
    movesCounter++;
    moves.textContent = movesCounter;
 }

function updateScoreStars(){
    if(movesCounter>9){
        stars.children[2].firstElementChild.classList.remove('fa-star');
        stars.children[2].firstElementChild.classList.add('fa-star-o');
    }
    if(movesCounter>14){
        stars.children[1].firstElementChild.classList.remove('fa-star');
        stars.children[1].firstElementChild.classList.add('fa-star-o');
    }
    if(movesCounter>20){
        stars.children[0].firstElementChild.classList.remove('fa-star');
        stars.children[0].firstElementChild.classList.add('fa-star-o');
    }

}

function restartGame(){
    movesCounter = 0;
    cardFaces = shuffle(cardFaces);
    moves.textContent = movesCounter;
    for(let i=0; i<cardFaces.length;i++){
        cards[i].firstElementChild.remove();
        cards[i].setAttribute('class', 'card');
    }
    stars.children[0].firstElementChild.setAttribute('class', 'fa fa-star');
    stars.children[1].firstElementChild.setAttribute('class', 'fa fa-star');
    stars.children[2].firstElementChild.setAttribute('class', 'fa fa-star');
    displayCards();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
