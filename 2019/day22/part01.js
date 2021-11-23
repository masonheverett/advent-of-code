import _ from 'lodash'

export const solve = (data) => {
  let deck = factoryDeck(10007)
  _.each(data, (inst) => {
    if (inst === "deal into new stack") {
      _.reverse(deck)
    } else if (_.includes(inst, "cut")) {
      const num = inst.match(/-?\d+/)
      if (num > 0) {
        deck = _.concat(deck.slice(num), deck.slice(0, num))
      } else if (num < 0) {
        deck = _.concat(deck.slice(_.size(deck) - Math.abs(num)), deck.slice(0, _.size(deck) - Math.abs(num)))
      }
    } else if (_.includes(inst, "deal with increment")) {
      const num = inst.match(/\d+/)
      const tempDeck = _.cloneDeep(deck)
      _.each(tempDeck, (card, i) => {
        deck[(i * num) % _.size(deck)] = card
      });
    }
  });
  console.log(_.indexOf(deck, 2020))
}

const factoryDeck = (length) => {
  deck = []
  for (let i = 0; i < length; i++) {
    deck.push(i)
  }
  return deck
}
