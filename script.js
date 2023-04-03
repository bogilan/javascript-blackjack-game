const dealer = document.querySelector('.dealers-cards');
const player = document.querySelector('.players-cards');
const newCardBtn = document.querySelector('.new-card-btn');
const stopGameBtn = document.querySelector('.stop-btn');

const suits = ['\u2665', '\u2666', '\u2663', '\u2660'];;
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create an empty deck array
const deck = [];

// Game End status
let gameEnd = false;

// Loop through each suit and rank to create cards
for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < ranks.length; j++) {
    const card = {
      suit: suits[i],
      rank: ranks[j]
    };
    deck.push(card);
  }
}

// Shuffle the deck function
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Call Shuffle function
shuffleDeck();

// Deal the initial two cards to the dealer and the player
function dealCards() {
    const dealerHand = [deck.shift(), deck.shift()];
    const playerHand = [deck.shift(), deck.shift()];
    return { // and return their values
        dealer: dealerHand,
        player: playerHand
    };
}

  // Deal the initial cards
const hands = dealCards();

// Retrieve the dealer's and player's hands
const dealerHand = hands.dealer;
const playerHand = hands.player;

// Function to retrieve user's cards and display them
function displayCards(user, hand) {
    user.textContent = '';
    hand.forEach(card => {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.textContent = card.rank + card.suit;
        user.appendChild(newCard);
    })
}

// Display cards for dealer and player
displayCards(dealer, dealerHand);
displayCards(player, playerHand);

// Calculate score function
function calculateScore(hand) {
  let score = 0; // starting score and num of aces
  let numAces = 0;

  // Loop through each card in the hand
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    const rank = card.rank;

    //Check if card is Face card or Ace
    switch (rank) {
      case 'J':
      case 'Q':
      case 'K':
        score += 10;
        break;
      case 'A':
        numAces++;
        break;
      default:
        score += parseInt(rank);
        break;
    }
  }
  // Handle Aces
  for (let i = 0; i < numAces; i++) {
    if (score + 11 > 21) { // if score is over 21
      score += 1; // count Ace as 1 and add it to score
    } else {
      score += 11; // else add 11
    }
  }

  return score;
}

let dealerScore = calculateScore(dealerHand);
let playerScore = calculateScore(playerHand);

// Compare Scores to determine the winner
function compareScores(dealerScore, playerScore) {
  if (dealerScore > 21) {
    console.log('Player wins!');
  } else if (playerScore > 21) {
    console.log('Dealer wins!');
  } else if (dealerScore > playerScore) {
    console.log('Dealer wins!');
  } else if (playerScore > dealerScore) {
    console.log('Player wins!');
  } else {
    console.log('It\'s a tie!');
  }
}


// Game Ending Conditions
function isGameOver(dealerScore, playerScore) {
  return dealerScore >= 17 || playerScore >= 21 || (dealerScore > 21 && playerScore > 21);
}

// Add New Card on button click and recalculate cards
newCardBtn.addEventListener('click', ()=> {
  const newCard = deck.shift();
  playerHand.push(newCard);
  displayCards(player, playerHand);
  playerScore = calculateScore(playerHand);
  gameEnd = isGameOver(dealerScore, playerScore);
  if(gameEnd) {
    console.log(gameEnd)
    compareScores(dealerScore, playerScore);
  }
})

// Player Stops
stopGameBtn.addEventListener('click', ()=> {
  gameEnd = true;
  dealerTurn(dealerHand, playerHand);
})

// Dealer's turn to play
function dealerTurn(dealerHand, playerHand) {
  dealerScore = calculateScore(dealerHand);
  playerScore = calculateScore(playerHand);

  // While score under 17 dealer pulls another card
  while (dealerScore < 17) {
    const card = deck.shift();
    dealerHand.push(card);
    displayCards(dealer, dealerHand);
    dealerScore = calculateScore(dealerHand);
  }

  compareScores(dealerScore, playerScore);
}