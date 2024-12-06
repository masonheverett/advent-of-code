import _ from 'lodash'

const NOT_DOT_OR_HASH = /[^\.#]/
const DIRECTIONS = {
  north: 'north',
  east: 'east',
  south: 'south',
  west: 'west'
}
const STARTERS = {
  '^': DIRECTIONS.north,
  '>': DIRECTIONS.east,
  'v': DIRECTIONS.south,
  '<': DIRECTIONS.west
}
const COORDS = {
  [DIRECTIONS.north]: [-1, 0],
  [DIRECTIONS.east]: [0, 1],
  [DIRECTIONS.south]: [1, 0],
  [DIRECTIONS.west]: [0, -1]
}
const NEXT_DIRECTIONS = {
  [DIRECTIONS.north]: DIRECTIONS.east,
  [DIRECTIONS.east]: DIRECTIONS.south,
  [DIRECTIONS.south]: DIRECTIONS.west,
  [DIRECTIONS.west]: DIRECTIONS.north
}

export const solve = (data) => {
  // Parse the grid
  let row, col, direction
  const grid = data.map((line, lineNdx) => {
    // Check for starting location
    const starter = line.match(NOT_DOT_OR_HASH)
    if (starter) {
      row = lineNdx
      col = line.search(NOT_DOT_OR_HASH)
      direction = STARTERS[starter]
    }
    return line.split('')
  })
  // Mark the starting position as visited
  grid[row][col] = 'X'
  // Walk it out
  while (true) {
    // Determine next space
    const nrow = row + COORDS[direction][0]
    const ncol = col + COORDS[direction][1]
    // If you are about to step out of bounds, break
    if (nrow < 0 || nrow >= grid.length) break
    if (ncol < 0 || ncol >= grid[0].length) break
    // If you are about to step into an obstacle, update direction and continue
    if (grid[nrow][ncol] === '#') {
      direction = NEXT_DIRECTIONS[direction]
      continue
    }
    // Move to the next space
    row = nrow
    col = ncol
    // Mark new spot as visited
    grid[row][col] = 'X'
  }
  // Print the grid (why not?)
  grid.forEach(line => console.log(line.join('')))
  // Count marked spots
  console.log(_.sum(grid.map(line => _.sum(line.map(char => char === 'X')))))
}
