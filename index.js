const suits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"]; 
const names = ["2", "3","4","5","6","7","8","9","10","Jack","Queen","King", "Ace"]; 
const values = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "Jack": 11,
    "Queen": 12,
    "King": 13,
    "Ace": 14,
};

// creates a fresh deck of cards every time. 
class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }
// Fisher-Yates method: starts from the end of an array. For every card, it’ll choose itself or another card before the iterating card to switch places with. So you’ll get equal amount of shuffles per card.
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}

class Player {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }
}

// creates the cards for each player
class Card {
    constructor(suit, value, name, player1Card, player2Card) {
        this.suit = suit;
        this.value = value;
        this.name = name;
        this.player1Card = player1Card;
        this.player2Card = player2Card;
    }
}

// flatMap combines arrays of arrays into 1 array. In this case an array would be created for each suit,but since i'm using flatMap, it is creating 1 array of all cards.
function freshDeck() {
    return suits.flatMap(suit => {
        return names.map(name => {
            return new Card(suit, name);
        })
    })
}


let player1Deck, player2Deck;

// start of game
function startGame() {
    const deck = new Deck();
    deck.shuffle();

// dealing the deck between two players. Using slice to create a new array with a portion of original array of cards, vs splice that will adjust the original array.   
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    player1Deck = new Deck(deck.cards.slice(0, deckMidpoint));
    player2Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));


    let player1Points = 0;
    let player2Points = 0;

    const gameRounds = 26;

    // for loop for each round. Chooses a card from each player deck and determines which one wins.
    for (let i = 0; i < gameRounds; i++) {
        const player1Card = player1Deck.cards[i].value;
        const player2card = player2Deck.cards[i].value;
        if(Object.values(player1Card)[0] > Object.values(player2card)[0]) {
            console.log(
                `Round: ${(i+1)} 
                \nPlayer 1 Wins!`
            );
            player1Points++;
        } else if (Object.values(player1Card)[0] < Object.values(player2card)[0]) {
            console.log(
                `Round: ${(i+1)} 
                \nPlayer 2 Wins!`               
            );
            player2Points++;
        } else {
            console.log(
                `Round: ${i+1}
                \nIt's a tie!`)
        }
    }

// End of game, lists out players final score and who won.
    if (player1Points > player2Points) {
        console.log(
        `Game Over!!!
        \nPlayer 1 Final Score: ${player1Points}
        \nPlayer 2 Final Score: ${player2Points}
        \nPlayer 1 wins the game!`
        );
    } else if (player1Points < player2Points) {
        console.log(
        `Game Over!!!
        \nPlayer 1 Final Score: ${player1Points}
        \nPlayer 2 Final Score: ${player2Points}
        \nPlayer 2 wins the game!`
        );
    } else {
        console.log(
        `Game Over!!!
        \nPlayer 1 Final Score: ${player1Points}
        \nPlayer 2 Final Score: ${player2Points}
        \nThe game is a tie!`
        );
    }
}

startGame();

