import _ from 'lodash'

export const solve = (data) => {
  const algo = data[0].split('')
  const fillChar = getfillChar(algo)
  let grid = data.slice(2).map(line => line.split(''))
  // print(grid)
  for (let i = 0; i < 50; i++) {
    pad(grid, fillChar(i))
    grid = enhance(algo, grid, fillChar(i))
    // print(grid)
  }
  console.log(litPixelCount(grid))
}

const getfillChar = (algo) => {
  // first is . means it is always dot
  if (_.first(algo) === '.') return () => '.'
  // first is #, last is . means it is . for evens, # for odds
  if (_.last(algo) === '.') return i => (i % 2 === 0 ? '.' : '#')
  // first is #, last is # means it is . first, # every time after
  return i => (i === 0 ? '.' : '#')
}

const pad = (grid, char) => {
  grid.push(Array(grid[0].length))
  grid[grid.length - 1].fill(char)
  grid.unshift(Array(grid[0].length))
  grid[0].fill(char)
  grid.forEach(line => {
    line.push(char)
    line.unshift(char)
  })
}

const enhance = (algo, grid, fillChar) => {
  const newGrid = _.cloneDeep(grid)
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      newGrid[row][col] = algo[algoIndex(grid, row, col, fillChar)]
    }
  }
  return newGrid
}

const algoIndex = (grid, row, col, fillChar) => {
  let str = ''
  str += row === 0 || col === 0 ? fillChar : grid[row - 1][col - 1]
  str += row === 0 ? fillChar : grid[row - 1][col]
  str += row === 0 || col === grid[0].length - 1 ? fillChar : grid[row - 1][col + 1]
  str += col === 0 ? fillChar : grid[row][col - 1]
  str += grid[row ][col]
  str += col === grid[0].length - 1 ? fillChar : grid[row][col + 1]
  str += row === grid.length - 1 || col === 0 ? fillChar : grid[row + 1][col - 1]
  str += row === grid.length - 1 ? fillChar : grid[row + 1][col]
  str += row === grid.length - 1 || col === grid[0].length - 1 ? fillChar : grid[row + 1][col + 1]
  const binStr = str.split('').map(char => char === '.' ? '0' : '1').join('')
  return Number(`0b${binStr}`)
}

const litPixelCount = (grid) => {
  return grid.reduce((sum, row) => {
    return sum + row.reduce((sum, pixel) => {
      return sum + (pixel === '#' ? 1 : 0)
    }, 0)
  }, 0)
}

// const print = (grid) => {
//   console.log('')
//   grid.forEach(row => {
//     console.log(row.join(''))
//   })
// }
