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

class Grid {
  constructor(data) {
    this.g = data.map((line, lineNdx) => {
      const starter = line.match(NOT_DOT_OR_HASH)
      if (starter) {
        this.row = lineNdx
        this.starterRow = this.row
        this.col = line.search(NOT_DOT_OR_HASH)
        this.starterCol = this.col
        this.direction = ICON_MAP[starter]
      }
      return line.split('')
    })
  }

  height() { return this.g.length }
  width() { return this.g[0].length }

  nextRow() { return this.row + this.direction.rowDiff }
  nextCol() { return this.col + this.direction.colDiff }
  nextSpaceMarker() { return this.g[this.nextRow()][this.nextCol()] }

  canStepInBounds() {
    return this.nextRow() >= 0 && this.nextRow() < this.height() &&
      this.nextCol() >= 0 && this.nextCol() < this.width()
  }
  isBlockedByObstacle() { return '#'.includes(this.nextSpaceMarker()) }
  nextSpaceIsTheSame() { return this.canStepInBounds() && this.nextSpaceMarker() === this.direction.icon }

  turn() { this.direction = DIRECTIONS[this.direction.next] }
  markCurrentPosition() { this.g[this.row][this.col] = this.direction.icon }
  stepForward() {
    this.row = this.nextRow()
    this.col = this.nextCol()
  }
  placeObstacle(row, col) { this.g[row][col] = '#' }

  print() {
    this.printGrid()
    this.printData()
  }

  printGrid() {
    this.g.forEach(line => console.log(line.join('')))
  }

  printData() {
    console.log(this.row, this.col, this.direction.icon)
  }
}

export const solve = (data) => {  
  // Brute force: try placing at every spot
  let loops = 0
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
      // Parse the grid
      const grid = new Grid(data)
      // Skip the starter space
      if (row === grid.starterRow && col === grid.starterCol) continue
      // Add an obstacle
      grid.placeObstacle(row, col)
      // Walk it out
      while (true) {
        // If you found a loop, you're done with this obstacle
        if (grid.nextSpaceIsTheSame()) {
          loops++
          break
        }
        // Otherwise, keep walking
        if (!grid.canStepInBounds()) break
        if (grid.isBlockedByObstacle()) {
          grid.turn()
          continue
        }
        grid.stepForward()
        grid.markCurrentPosition()
      }
    }
  }

  console.log(loops)
}
