const _ = require('lodash')

const MOVES = 100

const solve = (data) => {
  const cups = data[0].split('').map(Number)
  _.times(MOVES, (moveNum) => simulateMove(moveNum, cups))
  console.log('-- final --')
  printCups(MOVES % cups.length, cups)
  console.log('')
  printAnswer(cups)
}

const simulateMove = (moveNum, cups) => {
  const currCupIndex = moveNum % cups.length
  const currCupValue = cups[currCupIndex]
  console.log(`-- move ${moveNum + 1} --`)
  printCups(currCupIndex, cups)
  const removedCups = removeCups(currCupIndex + 1, cups)
  const destCupValue = findDestCup(currCupValue, removedCups, cups)
  console.log(`pick up: ${removedCups.join(', ')}`)
  console.log(`destination: ${destCupValue}`)
  console.log('')
  addCups(destCupValue, removedCups, cups)
  rotateCups(currCupIndex, currCupValue, cups)
}

const findDestCup = (currCupValue, removedCups, cups) => {
  let testCup = currCupValue - 1
  while (true) {
    const destCup = testCup === 0 ? cups.length + 3 : testCup
    if (!removedCups.includes(destCup)) return destCup
    testCup = destCup - 1
  }
}

const removeCups = (index, cups) => {
  return _.range(3).map(() => cups.splice(index >= cups.length ? 0 : index, 1)).flat()
}

const addCups = (destCupValue, cupsToAdd, cups) => {
  cups.splice(cups.indexOf(destCupValue) + 1, 0, ...cupsToAdd)
}

const rotateCups = (currCupIndex, currCupValue, cups) => {
  while (cups[currCupIndex] !== currCupValue) {
    cups.push(...cups.splice(0, 1))
  }
}

const printCups = (currCupIndex, cups) => {
  const cupString = cups.map(String).map((cup, index) => {
    if (index === currCupIndex) return `(${cup})`
    return ` ${cup} `
  }).join('')
  console.log(`cups: ${cupString}`)
}

const printAnswer = (cups) => {
  cups.push(...cups.splice(0, cups.indexOf(1)))
  console.log(cups.splice(1).join(''))
}

module.exports = { solve }
