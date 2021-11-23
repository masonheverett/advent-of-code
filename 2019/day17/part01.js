import _ from 'lodash'
const os = require('os')
import intcode from '../shared/intcode.js'

export const solve = (data) => {
  const parsedData = data[0].split(',').map(Number)
  const state = { data: parsedData }
  const { output } = intcode(state)
  const columns = _.indexOf(output, 10)
  const grid = _.chunk(output, columns + 1).map(row => row.slice(0, -1))
  const rows = grid.length
  let sum = 0
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (isIntersection(grid, x, y)) {
        sum += x * y
      }
    }
  }
  console.log(printableGrid(grid))
  console.log(sum)
}

const isIntersection = (grid, x, y) => {
  if (
    grid[y][x] === 35 &&
    x > 0 &&
    y > 0 &&
    x < grid[y].length - 1 &&
    y < grid.length - 1 &&
    grid[y + 1][x] === 35 &&
    grid[y - 1][x] === 35 &&
    grid[y][x + 1] === 35 &&
    grid[y][x - 1] === 35
  ) {
    grid[y][x] = 79
    return true
  }
  return false
}

const printableGrid = (grid) => {
  return grid.reduce((total, next) => {
    return total + next.reduce((total1, next1) => {
      return total1 + String.fromCharCode(next1)
    }, '') + os.EOL
  }, '')
}
