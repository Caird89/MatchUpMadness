// ASSIGNMENT 1- JAVASCRIPT- BY: STEVEN CAIRD, STUDENT# 200375917

// Step 1a - Select and store the gameboard element
const gameboardEle = document.querySelector('#gameboard');
// Step 1b - Select and store the score element
const scoreEle = document.querySelector('#score');
// Step 1c - Select and store the cards element
const cardsEle = document.querySelector('#cards');
// Step 1d - Select and store the message element
const messageEle = document.querySelector('#message');
// Step 2 - Create an array of cards
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const cardSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let deck = [].flat();
const cVLength = cardValues.length;
const cSLength = cardSuits.length;

//creates the card objects and populates the array of cards(deck)
function createDeck() {
    let randSuit = randInt(4);
    for (let s = 0; s < cSLength; s++) {
        for (let c = 0; c < cVLength; c++) {
            let card = {cardSuit: cardSuits[randSuit], cardValue: cardValues[c]};
            deck.push(card);
        }
    }
    return deck;
}

createDeck(deck);

//Step 2a - Create a function to shuffle the deck
// I chose to use the Fisher Yates shuffle, as it is the
// current standard for a random shuffle on an array in JS.
// It is without a doubt the best option for this scenario.
function shuffleDeck() {
    let dl = deck.length;
    let tmp = [];


    while (dl !== 0) {
        let randomCard = Math.floor(Math.random() * dl--);

        tmp = deck[dl];
        deck[dl] = deck[randomCard];
        deck[randomCard] = tmp;
    }
    return deck;
}

//
// // Step 2g - Call the shuffleDeck function
shuffleDeck(deck);


// Step 3a - Create an array to store 2 players
let players = [
    {name: 'playerOne', score: (scoreEle > 0) ? scoreEle : scoreEle.value = 0},
    {name: 'playerTwo', score: (scoreEle > 0) ? scoreEle : scoreEle.value = 0}
];
// Step 3b - Create a variable to store the current player
//chooses the starting player at random
let currentPlayer;
setCurrentPlayer();


// Step 3c - Create a variable to store the first selected card
//creates a variable current card variable and sets default to zero
let currentCard;
setCurrentCardDefault();

//Step 4 - Iterate through the deck and bind a click event to each one
function createCardElements() {
    deck.forEach(function (card) {
        // Step 4a - Create a new div element to be a card
        let cardEle = document.createElement('div');
        cardEle.appendChild(document.createElement('div'));
        // Step 4b - Add a 'card' class to the class list on the new div element
        cardEle.classList.add('card');
        // Step 4c - Add a data value to the card element with the card's value in it
        cardEle.dataset.prototype = Object.values(card);
        // Step 4c - Bind the cardSelected function
        // to the click event on the cardEle
        cardEle.addEventListener("click", cardSelected);
        cardsEle.appendChild(cardEle);
    })
}

createCardElements(deck);
startMessage();
scoreDisplay();
// Step 5 - Create a function to store the logic
// for when a card is selected
function cardSelected(event) {

    // Step 5a - Check if there is already a card selected
    if (currentCard !== 0) {
        // Step 6 - Compare the cards
        if (currentCard.dataset.prototype === event.target.dataset.prototype) {
            // Step 6b - Add a class to the 2 card elements
            // flipping them over
            
            showCardFace(currentCard);
            currentCard.removeEventListener('click', cardSelected);
            showCardFace(event.target);
            event.target.removeEventListener('click', cardSelected);
            // Step 6c - Add a point to the score for this player
            currentPlayer.score += 1;
            scoreDisplay();
            // Step 6d - Tell the player to go again
            // (use string interpolation to show which player you're addressing)
            messageEle.textContent = `Congratulations! ${currentPlayer.name} You can remember basic things! Take another turn.`;
            setCurrentCardDefault();
            checkBoard();
        } else {
            showCardFace(event.target);
            event.target.removeEventListener('click', cardSelected);
            // Step 6e - Provide a fail message to the player
            messageEle.textContent = `Oh, so sorry ${currentPlayer.name} !!! But, that sour taste in your mouth... That's Failure!`;

            setTimeout(function () {
                hideCardFace(event.target);
                hideCardFace(currentCard);
                // Step 6f - Using a ternary, change players
                currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

                // Step 6g - Concatenate a message to the message element
                // advising player 2 that it's their turn now
                // (use string interpolation to show which player you're addressing)
                messageEle.textContent = `Hey, ${currentPlayer.name} it's your turn!`;
                setCurrentCardDefault();
            }, 1050);
            //reactivates eventlisteners when putting the cards back in play
            event.target.addEventListener('click', cardSelected);
            currentCard.addEventListener('click', cardSelected);
        }
    } else {
        // Step 5b - Assign the card to currentCard
        currentCard = event.target;
        showCardFace(currentCard);
        currentCard.removeEventListener('click', cardSelected); // prevents the same card from being selected
        // Step 5c - Tell the player to select another card
        // (use string interpolation to show which player you're addressing)
        messageEle.textContent = `Not done yet ${currentPlayer.name}, please select another card`;
    }
}

// Step 7 - Check if the board is full
function checkBoard() {
    if (document.querySelectorAll('.flipped').length === deck.length) {
        // Step 7a - Check if one of the players has won
        if (players[0].score !== players[1].score) {
            let victor = (players[0].score > players[1].score) ? players[0] : players[1];
            // Step 7b - Tell the player they've won
            // (use string interpolation to show which player you're addressing)
            messageEle.textContent = `Well, ${victor.name} somehow you managed to win!!`;
        } else {
            // Step 7c - Tell the players that the game has ended in a tie
            messageEle.textContent = "The game was a tie! Guess you both lose...";
        }
    }
}

// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)

// Step 1 - You will need a reset button in index.html
const resetBtn = document.querySelector('#resetBtn');
// Step 2 - You will need to bind an event listener
//          that detects the click and executes a function
resetBtn.addEventListener("click", newGame);

function newGame() {
    // Step 3 - You will need to reset all the pieces on the board
    resetBoard();
    shuffleDeck();
    createCardElements();
    setCurrentCardDefault();
    // Step 5 - You will need to reset the players
    resetPlayers();
    setCurrentPlayer();
    scoreDisplay();
    // Step 4 - You will need to reset the messages
    startMessage();
}

//this method provides generates a (simulated)random number
function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// this function flips a card to show face
function showCardFace(cardEle) {
    cardEle.classList.add('flipped');
    cardEle.firstChild.textContent = cardEle.dataset.prototype;
}

// this function flips a card to hide face
function hideCardFace(cardEle) {
    cardEle.classList.remove('flipped');
    cardEle.firstChild.textContent = "";
}

// this function displays the current player scores when called
// the messages are different based on the current score
function scoreDisplay() {
    if (players[0].score > players[1].score) {
        scoreEle.textContent =
            `${players[0].name} is winning with a score of ${players[0].score} then there is
                    ${players[1].name} with a score of ${players[1].score}...What a disappointment 
                     \xa0\xa0${players[0].name}'s Score: ${players[0].score}\xa0\xa0\xa6\xa0\xa0
                    ${players[1].name}'s Score: ${players[1].score}`;
    }

    else if (players[1].score > players[0].score) {
        scoreEle.textContent =
            `${players[1].name} is winning with a score of ${players[1].score} then there is
                    ${players[0].name} with a score of ${players[0].score}...What a disappointment
                    \n\xa0\xa0${players[1].name}'s Score: ${players[1].score}\xa0\xa0\xa6\xa0\xa0
                    ${players[0].name}'s Score: ${players[0].score}`;
    } else {
        scoreEle.textContent =
            `${players[0].name}'s Score: ${players[0].score}\xa0\xa0\xa6\xa0\xa0
                    ${players[1].name}'s Score: ${players[1].score}`;
    }
}

// this function will remove the gameboards current card elements
function resetBoard() {
    while (cardsEle.firstChild) {
        cardsEle.removeChild(cardsEle.firstChild);
    }
}

// this function resets the players objects to their starting values
function resetPlayers() {
    players = [
        {name: 'player1', score: (scoreEle.value = 0) ? scoreEle : scoreEle.value = 0},
        {name: 'player2', score: (scoreEle.value = 0) ? scoreEle : scoreEle.value = 0}
    ]
}

// this function will return the start message when called
function startMessage() {
    messageEle.textContent = `Time to set it off ${currentPlayer.name}`;
}

// this function sets the current player value
function setCurrentPlayer() {
    currentPlayer = players[randInt(2)];
}

function setCurrentCardDefault() {
    currentCard = 0;
}