const suits = ["clubs", "diamonds", "hearts", "spades"];
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

let DecoOfCards = [];

for (let s = 0; s < suits.length; s++) {
  for (let n = 0; n < numbers.length; n++) {
    DecoOfCards.push({ suit: suits[s], number: numbers[n], rank: n + 1 });
  }
}

module.exports = DecoOfCards;
