const dealer = document.querySelector('.dealers-cards');
const player = document.querySelector('.players-cards');
const newCardBtn = document.querySelector('.new-card-btn');
const stopGameBtn = document.querySelector('.stop-btn');
const newGameBtn = document.querySelector('.new-game');
const gameResult = document.querySelector('.game-result')

const suits = ['\u2665', '\u2666', '\u2663', '\u2660'];;
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create an empty deck array
let deck = [];

// Start New Game
newGame();

function createDeck() {
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
}

// Shuffle the deck function
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal the initial two cards to the dealer and the player
function dealCards() {
    const dealerHand = [deck.shift(), deck.shift()];
    const playerHand = [deck.shift(), deck.shift()];
    return { // and return their values
        dealer: dealerHand,
        player: playerHand
    };
}

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

function hideDealersCard() {
  const hiddenCard = document.querySelector('.dealers-cards .card:first-child');
  hiddenCard.classList.toggle('hidden');
}

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

// Compare Scores to determine the winner
function compareScores(dealerScore, playerScore) {
  if (dealerScore > 21) {
    gameResult.textContent = 'Player wins!';
  } else if (playerScore > 21) {
    gameResult.textContent = 'Dealer wins!';
  } else if (dealerScore > playerScore) {
    gameResult.textContent = 'Dealer wins!';
  } else if (playerScore > dealerScore) {
    gameResult.textContent = 'Player wins!';
  } else {
    gameResult.textContent = 'It\'s a tie!';
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
    hideDealersCard();
    dealerTurn(dealerHand, playerHand);
    newCardBtn.disabled = true;
  }
})

// Player Stops
stopGameBtn.addEventListener('click', ()=> {
  gameEnd = true;
  newCardBtn.disabled = true;
  stopGameBtn.disabled = true;
  hideDealersCard();
  dealerTurn(dealerHand, playerHand);
})

// Dealer's turn to play
function dealerTurn(dealerHand, playerHand) {
  dealerScore = calculateScore(dealerHand);
  playerScore = calculateScore(playerHand);
  // While score under 17 dealer pulls another card
  function drawDealerCard() {
    setTimeout(() => {
      const card = deck.shift();
      dealerHand.push(card);
      displayCards(dealer, dealerHand);  
      dealerScore = calculateScore(dealerHand);
      if (dealerScore < 17) {
        drawDealerCard();
      } else {
        compareScores(dealerScore, playerScore);
      }
    }, 1000); // Set the timeout value to adjust the drawing speed of cards in milliseconds
  }
  drawDealerCard();
}

// Start New Game Function
function newGame() {
  // Reset game end status
  gameEnd = false;
  
  // Clear dealer and player hands
  dealerHand = [];
  playerHand = [];

  // Restart dealer and player scores
  dealerScore = 0;
  playerScore = 0;

  // Clear game result text
  gameResult.textContent = '';

  // Clear dealer and player cards
  dealer.textContent = '';
  player.textContent = '';

  // Create a new deck, shuffle it, and deal initial cards
  createDeck();
  shuffleDeck();
  let hands = dealCards();
  dealerHand = hands.dealer;
  playerHand = hands.player;

  // Display initial cards and hide dealer's first card
  displayCards(dealer, dealerHand);
  displayCards(player, playerHand);
  hideDealersCard();

  // Enable new card and stop game buttons
  newCardBtn.disabled = false;
  stopGameBtn.disabled = false;
}

// Start new game on button click
newGameBtn.addEventListener('click', () => {
  newGame();
});