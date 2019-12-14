const _ = require('lodash')

const solve = (data) => {
  const rMap = parseData(data)
  console.log(howMuchOre({ rMap }))
}

const howMuchOre = ({ count = 1, element = 'FUEL' , rMap, bank = {} }) => {
  // If we are looking for ORE, we just return however many we need
  if (element === 'ORE') {
    return count
  }

  // Check the bank
  let desiredCount = count
  if (bank[element] >= desiredCount) {
    // If the bank has all we need, take it from the bank return 0
    bank[element] =- desiredCount
    return 0
  } else if (bank[element] > 0) {
    // If the bank has some of what we need, empty the bank of that element
    desiredCount -= bank[element]
    bank[element] = 0
  }

  // Make anything else you need
  // Figure out how much you're making
  const countPerBatch = rMap[element][0]
  let howManyMore = 0
  let howManyBatches = 0
  while (desiredCount > howManyMore) {
    howManyBatches++
    howManyMore += countPerBatch
  }

  // Make it
  const oreNeeded = rMap[element][1].reduce((totalOre, nextReaction) => {
    return totalOre + howMuchOre({
      count: howManyBatches * nextReaction[1],
      element: nextReaction[0],
      rMap,
      bank
    })
  }, 0)

  // Store leftover in the bank
  const leftover = howManyMore - desiredCount
  if (leftover > 0) {
    if (bank[element] === undefined) bank[element] = 0
    bank[element] += leftover
  }

  // return how much ore you needed to make the ingredients
  return oreNeeded
}

/**
 * Need 7A, we have 0 in the bank
 *   We can make 10 at a time, we need 10 ORE           10 ORE USED
 *   Make 10A, use 7, save 3                            3 A saved
 * Need 1E, we have 0 in the bank
 *   We can make 1 at a time, we need 7A and 1D
 *   We have 3A, need 4 more,
 *
 */

const parseData = (data) => {
  const rMap = {}
  data.forEach((line) => {
    const [leftSide, rightSide] = line.split(' => ')
    const [rightCount, rightElement] = rightSide.split(' ')
    const ingredients = leftSide.split(', ').map(ingredient => {
      const [ingCount,  ingElement] = ingredient.split(' ')
      return [ingElement, Number(ingCount)]
    })
    rMap[rightElement] = [Number(rightCount), ingredients]
  })
  return rMap
}

module.exports = { solve }
