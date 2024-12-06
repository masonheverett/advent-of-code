import _ from 'lodash'

const NOT_DOT_OR_HASH = /[^\.#]/
const DIRECTIONS = {
  north: {icon: '^', rowDiff: -1, colDiff: 0, next: 'east'},
  east: {icon: '>', rowDiff: 0, colDiff: 1, next: 'south'},
  south: {icon: 'v', rowDiff: 1, colDiff: 0, next: 'west'},
  west: {icon: '<', rowDiff: 0, colDiff: -1, next: 'north'},
}
const ICON_MAP = {
  '^': DIRECTIONS.north,
  '>': DIRECTIONS.east,
  'v': DIRECTIONS.south,
  '<': DIRECTIONS.west
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
      direction = ICON_MAP[starter]
    }
    return line.split('')
  })
  // Walk it out
  while (true) {
    // Determine next space
    const nrow = row + direction.rowDiff
    const ncol = col + direction.colDiff
    // If you are about to step out of bounds, break
    if (nrow < 0 || nrow >= grid.length) break
    if (ncol < 0 || ncol >= grid[0].length) break
    // If you are about to step into an obstacle, update direction and continue
    if (grid[nrow][ncol] === '#') {
      direction = DIRECTIONS[direction.next]
      continue
    }
    // Move to the next space
    row = nrow
    col = ncol
    // Mark new spot as visited
    grid[row][col] = direction.icon
  }
  // Print the grid (why not?)
  grid.forEach(line => console.log(line.join('')))
  // Count marked spots
  console.log(_.sum(grid.map(line => _.sum(line.map(char => '^>v<'.includes(char))))))
}
