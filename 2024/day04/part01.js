import _ from 'lodash'

const E = 'east'
const SE = 'southeast'
const S = 'south'
const SW = 'southwest'

const coordDiffs = {
  'east': [0, 1],
  'southeast': [1, 1],
  'south': [1, 0],
  'southwest': [1, -1]
}

export const solve = (data) => {
  const grid = data.map(line => line.split(''))
  console.log(_.sum(grid.map((line, rowNum) => {
    return _.sum(line.map((char, colNum) => {
      if (char === 'X') {
        return isMatch(grid, rowNum, colNum, E, 'MAS') +
          isMatch(grid, rowNum, colNum, SE, 'MAS') +
          isMatch(grid, rowNum, colNum, S, 'MAS') +
          isMatch(grid, rowNum, colNum, SW, 'MAS')
      }
      if (char === 'S') {
        return isMatch(grid, rowNum, colNum, E, 'AMX') +
          isMatch(grid, rowNum, colNum, SE, 'AMX') +
          isMatch(grid, rowNum, colNum, S, 'AMX') +
          isMatch(grid, rowNum, colNum, SW, 'AMX')
      }
      return 0
    }))
  })))
}

const isMatch = (grid, rowNum, colNum, direction, str) => {
  // Congrats, you found a match
  if (str === '') return 1
  const nextRowNum = rowNum + coordDiffs[direction][0]
  const nextColNum = colNum + coordDiffs[direction][1]
  // Ran out of bounds vertically
  if (nextRowNum < 0 || nextRowNum >= grid.length) return 0
  // Ran out of bounds horizontally
  if (nextColNum < 0 || nextColNum >= grid[0].length) return 0
  // Wrong letter
  if (grid[nextRowNum][nextColNum] !== str[0]) return 0
  // Recurse!
  return isMatch(grid, nextRowNum, nextColNum, direction, str.substring(1))
}
