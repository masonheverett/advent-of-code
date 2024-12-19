import _ from 'lodash'
import directions from '../util/directions.js'

export const solve = (data) => {
  // Parse input
  const grid = data.map(line => line.split(''))
  console.log(_.sum(grid.map((line, rowNum) => {
    // Check each point in the cell in the grid
    return _.sum(line.map((char, colNum) => {
      // Check if it's XMAS
      if (char === 'X') {
        // Look E, SE, S, and SW
        return isMatch(grid, rowNum, colNum, directions.east, 'MAS') +
          isMatch(grid, rowNum, colNum, directions.southeast, 'MAS') +
          isMatch(grid, rowNum, colNum, directions.south, 'MAS') +
          isMatch(grid, rowNum, colNum, directions.southwest, 'MAS')
      }
      // Check if it's SAMX
      if (char === 'S') {
        // Look E, SE, S, and SW
        return isMatch(grid, rowNum, colNum, directions.east, 'AMX') +
          isMatch(grid, rowNum, colNum, directions.southeast, 'AMX') +
          isMatch(grid, rowNum, colNum, directions.south, 'AMX') +
          isMatch(grid, rowNum, colNum, directions.southwest, 'AMX')
      }
      return 0
    }))
  })))
}

const isMatch = (grid, rowNum, colNum, direction, str) => {
  // Congrats, you found a match
  if (str === '') return 1
  const nextRowNum = rowNum + direction.rowDiff
  const nextColNum = colNum + direction.colDiff
  // Ran out of bounds vertically
  if (nextRowNum < 0 || nextRowNum >= grid.length) return 0
  // Ran out of bounds horizontally
  if (nextColNum < 0 || nextColNum >= grid[0].length) return 0
  // Wrong letter
  if (grid[nextRowNum][nextColNum] !== str[0]) return 0
  // Recurse!
  return isMatch(grid, nextRowNum, nextColNum, direction, str.substring(1))
}
