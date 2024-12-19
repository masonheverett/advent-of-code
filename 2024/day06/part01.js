import _ from 'lodash'
import directions from '../util/directions.js'

const NOT_DOT_OR_HASH = /[^\.#]/

class Grid {
  constructor(data) {
    this.g = data.map((line, lineNdx) => {
      const starter = line.match(NOT_DOT_OR_HASH)
      if (starter) {
        this.row = lineNdx
        this.col = line.search(NOT_DOT_OR_HASH)
        this.direction = directions[starter]
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
  isBlockedByObstacle() { return this.nextSpaceMarker() === '#' }

  markCurrentPosition() { this.g[this.row][this.col] = 'X' }
  turn() { this.direction = this.direction.cwTurn }
  stepForward() {
    this.row = this.nextRow()
    this.col = this.nextCol()
  }

  distinctVisitedSpacesCount() { return _.sum(this.g.map(line => _.sum(line.map(char => char === 'X')))) }

  print() { this.g.forEach(line => console.log(line.join(''))) }
}

export const solve = (data) => {
  // Parse the grid
  const grid = new Grid(data)
  // Mark the starting position as visited
  grid.markCurrentPosition()
  // Walk it out
  while (true) {
    if (!grid.canStepInBounds()) break
    if (grid.isBlockedByObstacle()) {
      grid.turn()
      continue
    }
    grid.stepForward()
    grid.markCurrentPosition()
  }
  // Count marked spots
  console.log(grid.distinctVisitedSpacesCount())
}
