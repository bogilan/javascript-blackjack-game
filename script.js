const dealer = document.querySelector('.dealers-cards');
const player = document.querySelector('.players-cards');

const suits = ['\u2665', '\u2666', '\u2663', '\u2660'];;
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create an empty deck array
const deck = [];

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