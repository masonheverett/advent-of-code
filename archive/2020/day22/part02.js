import _ from 'lodash'

export const solve = (data) => {
  let [deck1, deck2] = parse(data)
  const [endDeck1, endDeck2] = game(deck1, deck2)
  const winningDeck = endDeck1.length > 0 ? endDeck1 : endDeck2
  let score = 0
  _.forEach(winningDeck, (card, i) => {
    score += card * (winningDeck.length - i)
  })
  console.log(score)
}

const game = (deck1, deck2) => {
  var previousHands = []
  while (deck1.length > 0 && deck2.length > 0) {
    const currentHand = deck1.join(',') + " - " + deck2.join(',')
    if (_.includes(previousHands, currentHand)) {
      return [deck1, deck2]
    }
    previousHands.push(currentHand)
    const card1 = deck1[0]
    const card2 = deck2[0]
    deck1 = _.drop(deck1)
    deck2 = _.drop(deck2)
    if (card1 > deck1.length || card2 > deck2.length) {
      if (card1 > card2) {
        deck1.push(card1)
        deck1.push(card2)
      } else {
        deck2.push(card2)
        deck2.push(card1)
      }
    } else {
      const subDeck1 = _.slice(deck1, 0, card1)
      const subDeck2 = _.slice(deck2, 0, card2)
      const [endDeck1, endDeck2] = game(subDeck1, subDeck2)
      if (endDeck1.length > 0) {
        deck1.push(card1)
        deck1.push(card2)
      } else {
        deck2.push(card2)
        deck2.push(card1)
      }
    }
  }
  return [deck1, deck2]
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
