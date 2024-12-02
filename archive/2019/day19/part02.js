import _ from 'lodash'
import intcode from '../shared/intcode.js'

const startingX = 59
const startingY = 100

export const solve = (data) => {
  const parsed = data[0].split(',').map(Number)
  let x = startingX
  let y = startingY
  let topLeftX
  let topLeftY
  while (true) {
    let bottomLeft = intcode({ data: _.cloneDeep(parsed) }, x)
    bottomLeft = intcode(bottomLeft, y)
    if (_.last(bottomLeft.output) === 1) {
      let topRight = intcode({ data: _.cloneDeep(parsed) }, x + 99)
      topRight = intcode(topRight, y - 99)
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
      let state = intcode({ data: _.cloneDeep(parsed) }, x)
      state = intcode(state, y)
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
