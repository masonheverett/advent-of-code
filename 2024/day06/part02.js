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
  isBlockedByObstacle() { return '#0'.includes(this.nextSpaceMarker()) }
  nextSpaceIsTheSame() { return this.canStepInBounds() && this.nextSpaceMarker() === this.direction.icon }
  nextSpaceIsTheStart() { return this.nextRow() === this.starterRow && this.nextCol() === this.starterCol }

  turn() { this.direction = DIRECTIONS[this.direction.next] }
  markCurrentPosition() { this.g[this.row][this.col] = this.direction.icon }
  stepForward() {
    this.row = this.nextRow()
    this.col = this.nextCol()
  }
  placeObstacle() { this.g[this.nextRow()][this.nextCol()] = '0' }

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
  // Parse the grid
  const grid = new Grid(data)
  // Walk it out
  let loops = 0
  while (true) {
    if (!grid.canStepInBounds()) break
    if (grid.isBlockedByObstacle()) {
      grid.turn()
      continue
    }
    if (!grid.nextSpaceIsTheStart()) {
      const cgrid = _.cloneDeep(grid)
      cgrid.placeObstacle()
      while (true) {
        if (!cgrid.canStepInBounds()) break
        if (cgrid.nextSpaceIsTheSame()) {
          loops++
          break
        }
        if (cgrid.isBlockedByObstacle()) {
          cgrid.turn()
          continue
        }
        cgrid.stepForward()
        cgrid.markCurrentPosition()
      }
    }
    grid.stepForward()
    grid.markCurrentPosition()
  }
  console.log(loops)
}
