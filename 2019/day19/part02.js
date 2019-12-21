const _ = require('lodash')
const runProgram = require('../../intcode.js').runProgram

const startingX = 59
const startingY = 100

const solve = (data) => {
  const parsed = data[0].split(',').map(Number)
  let x = startingX
  let y = startingY
  let topLeftX
  let topLeftY
  while (true) {
    let bottomLeft = runProgram({ data: _.cloneDeep(parsed) }, x)
    bottomLeft = runProgram(bottomLeft, y)
    if (_.last(bottomLeft.output) === 1) {
      let topRight = runProgram({ data: _.cloneDeep(parsed) }, x + 99)
      topRight = runProgram(topRight, y - 99)
      if (_.last(topRight.output) === 1) {
        topLeftX = x
        topLeftY = y - 99
        break
      } else {
        y++ // Move down
      }
    } else {
      x++ // Move right
    }
  }

  const grid = []
  for (let y = topLeftY - 10; y < topLeftY + 109; y++) {
    grid[y - (topLeftY - 10)] = []
    for (let x = topLeftX - 10; x < topLeftX + 109; x++) {
      let state = runProgram({ data: _.cloneDeep(parsed) }, x)
      state = runProgram(state, y)
      if (_.last(state.output) === 1) {
        if (y < topLeftY || y > topLeftY + 99 || x < topLeftX || x > topLeftX + 99) {
          grid[y - (topLeftY - 10)][x - (topLeftX - 10)] = '#'
        } else {
          grid[y - (topLeftY - 10)][x - (topLeftX - 10)] = '*'
        }
      } else {
        grid[y - (topLeftY - 10)][x - (topLeftX - 10)] = '.'
      }
    }
  }
  console.log(printable(grid))
  console.log(10000 * topLeftX + topLeftY)
}

const printable = (grid) => {
  let out = ''
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      out += grid[y][x]
    }
    out += '\n'
  }
  return out
}

module.exports = { solve }
