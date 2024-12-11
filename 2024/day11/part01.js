import _ from 'lodash'

const BLINKS = 25

export const solve = (data) => {
  let stones = {}
  // Order doesn't matter, keep track of number of stones of each value
  data[0].split(' ').map(str => _.toNumber(str)).forEach(num => {
    if (!stones[num]) stones[num] = 0
    stones[num]++
  })
  // Blink
  _.times(BLINKS, () => {
    let newStones = {}
    Object.keys(stones).map(str => _.toNumber(str)).forEach(stone => {
      if (stone === 0) {
        // If 0, replace with 1
        addStone(1, newStones, stones[stone])
        return
      }
      if (_.toString(stone).length % 2) {
        // If odd number of digits, multiply by 2024
        addStone(stone * 2024, newStones, stones[stone])
        return
      }
      // If even number of digits, split
      addStone(_.toNumber(_.toString(stone).substring(0, _.toString(stone).length / 2)), newStones, stones[stone])
      addStone(_.toNumber(_.toString(stone).substring(_.toString(stone).length / 2)), newStones, stones[stone])
    })
    stones = newStones
  })
  console.log(_.sum(Object.values(stones)))
}

const addStone = (newStone, newStones, count) => {
  if (!newStones[newStone]) newStones[newStone] = 0
  newStones[newStone] += count
}
