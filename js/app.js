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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 cardFaces = shuffle(cardFaces);
 let cards = document.getElementsByClassName('card');

 for(let i=0; i<cardFaces.length;i++){
     let content = document.createElement('i');
     content.setAttribute('class', cardFaces[i]);
     cards[i].appendChild(content);
     cards[i].addEventListener('click', function(){
        if(!cards[i].classList.contains('match')){
            showSymbol(i);
            addToOpenCards(i);
        }
     });
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function showSymbol(i){
     cards[i].classList.add('open', 'show');
 }

 function addToOpenCards(i){
    openCards.push({id: i, card: cards[i]});
    console.log(cards[i].firstChild);
    if(openCards.length>1){
        console.log(openCards[0].card.innerHTML+' : '+ openCards[1].card.innerHTML);
        if(openCards[0].card.innerHTML===openCards[1].card.innerHTML){
            lockCardsOpen(openCards[0].id);
            lockCardsOpen(openCards[1].id);
            incrementCounter();
            openCards = [];
        }else{
            hideSymbol(openCards[0].id);
            hideSymbol(openCards[1].id);
            incrementCounter();
            openCards = [];
        }
    }
}

function lockCardsOpen(i){
    cards[i].classList.add('match');
}

function hideSymbol(i){
    cards[i].setAttribute('class', 'card');
}

function incrementCounter(){
    movesCounter++;
    moves.textContent = movesCounter;
 }
