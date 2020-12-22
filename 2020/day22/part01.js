const _ = require('lodash')



const solve = (data) => {
  let [deck1, deck2] = parse(data)
  while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1[0]
    const card2 = deck2[0]
    deck1 = _.drop(deck1)
    deck2 = _.drop(deck2)
    if (card1 > card2) {
      deck1.push(card1)
      deck1.push(card2)
    } else {
      deck2.push(card2)
      deck2.push(card1)
    }
  }
  const winningDeck = deck1.length > 0 ? deck1 : deck2
  let score = 0
  _.forEach(winningDeck, (card, i) => {
    score += card * (winningDeck.length - i)
  })
  console.log(score)
}

const parse = (data) => {
  const player2Index = _.indexOf(data, 'Player 2:')
  let deck1 = []
  let deck2 = []
  _.forEach(data, (line, i) => {
    if (i > 0 && i < player2Index - 1) {
      deck1.push(parseInt(line))
    } else if (i > player2Index) {
      deck2.push(parseInt(line))
    }
  })
  return [deck1, deck2]
}

module.exports = { solve }
