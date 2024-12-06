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
  console.log(w(grid, row, col, direction, true))
  // Check if you can move
  while (canMove(grid, row, col, direction)) {
    // Move
    row, col, direction = move(grid, row, col, direction)
    // Check if you can create a loop by placing an obstacle directly in front of you
    let nrow, ncol, ndirection = row, col, direction
    const ngrid = copyGridWithObstacle(grid, row, col, direction)
    while (canMove(ngrid, nrow, ncol, ndirection)) {
      // Check for loop, break if so
      // Move
      nrow, ncol, direction = move(ngrid, nrow, ncol, direction)
    }
  }
}

const canMove = (grid, row, col, direction) => {

}

const move = (grid, row, col, direction) => {

}

const copyGridWithObstacle = (grid, row, col, direction) => {

}

const walkItOut = (grid, row, col, direction, lookForLoops) => {
  let loops = 0
  while (true) {
    // Determine next space
    const nrow = row + direction.rowDiff
    const ncol = col + direction.colDiff
    // If you are about to move out of bounds, break
    if (nrow < 0 || nrow >= grid.length) break
    if (ncol < 0 || ncol >= grid[0].length) break
    // If you are about to move into an obstacle, update direction and continue
    if (grid[nrow][ncol] === '#') {
      direction = DIRECTIONS[direction.next]
      continue
    }
    // If you are about to move to a space that we've already visited going this same direction, you're in a loop
    if (grid[nrow][ncol] === direction.icon)
    // Move to the next space
    row = nrow
    col = ncol
    // Mark new spot as visited
    grid[row][col] = direction.icon
    if (lookForLoops) {
      // Check if placing an obstacle right in front of you would create a loop
      if (wouldCreateLoop(grid, row, col, direction)) {
        grid.forEach(line => console.log(line.join('')))
        console.log(nrow, ncol)
        loops++
      }
    }
  }
  // Print the grid (why not?)
  grid.forEach(line => console.log(line.join('')))
  return loops
}

const wouldCreateLoop = (origGrid, row, col, direction) => {
  const grid = _.cloneDeep(origGrid)

  return false
}
