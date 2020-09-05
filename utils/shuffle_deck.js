const DeckOfCards = require("../data/DeckOfCards");

const shuffle_deck = (no_of_players) => {
  if (no_of_players === 5) {
    DeckOfCards.splice(0, 1);
    DeckOfCards.splice(12, 1);
  }
  for (let i = DeckOfCards.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * DeckOfCards.length);
    let temp = DeckOfCards[j];
    DeckOfCards[j] = DeckOfCards[i];
    DeckOfCards[i] = temp;
  }
  return DeckOfCards;
};

module.exports = shuffle_deck;
