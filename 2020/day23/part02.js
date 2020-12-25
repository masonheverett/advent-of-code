const _ = require('lodash')

const MOVES = 10000000
const CUPS = 1000000

const solve = (data) => {
  const cups = parse(data)
  const labels = mapLabels(cups)
  _.range(MOVES).reduce((currentCup) => {
    return simulateMove(currentCup, cups, labels)
  }, cups[0])
  printAnswer(cups, labels)
}

const parse = (data) => {
  return data[0].split('').map(Number)
    .concat(_.range(10, CUPS + 1))
    .map((cup, index) => {
      return {
        label: Number(cup),
        next: (index + 1) % CUPS,
        index: index
      }
    })
}

const mapLabels = (cups) => {
  const labels = Array(cups.length)
  cups.forEach((cup) => labels[cup.label - 1] = cup.index)
  return labels
}

const simulateMove = (current, cups, labels, ) => {
  const firstPickUp = countAhead(1, current, cups)
  const lastPickUp = countAhead(2, firstPickUp, cups)
  const nextCurrent = countAhead(1, lastPickUp, cups)
  const destination = findDestination(current, cups, labels)
  const afterDestination = countAhead(1, destination, cups)
  current.next = nextCurrent.index
  destination.next = firstPickUp.index
  lastPickUp.next = afterDestination.index
  return nextCurrent
}

const countAhead = (count, current, cups) => {
  return cups[_.range(count).reduce((prev) => {
    return cups[prev].next
  }, current.index)]
}

const findDestination = (current, cups, labels) => {
  const chain = _.range(1, 4).map((ahead) => countAhead(ahead, current, cups).label)
  let destinationLabel = current.label
  do {
    destinationLabel = (destinationLabel === 1 ? cups.length : destinationLabel - 1)
  } while (chain.includes(destinationLabel))
  return cups[labels[destinationLabel - 1]]
}

const printAnswer = (cups, labels) => {
  console.log(countAhead(1, cups[labels[0]], cups).label * countAhead(2, cups[labels[0]], cups).label)
}

module.exports = { solve }
