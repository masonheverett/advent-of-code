import _ from 'lodash'
import directions from '../util/directions.js'

const MAX_CHEAT = 20
const MIN_SAVINGS = 100

const MARKERS = {
  space: '.',
  wall: '#',
  start: 'S',
  end: 'E'
}

const coordsToId = (row, col) => row * 1000 + col
const idToCoords = (id) => [Math.floor(id / 1000), id % 1000]

class Racetrack {
  constructor(data) {
    this.grid = data.map((line, lineNdx) => {
      const startCol = line.indexOf(MARKERS.start)
      const endCol = line.indexOf(MARKERS.end)
      if (startCol > -1) {
        this.row = lineNdx
        this.col = startCol
        this.startRow = lineNdx
        this.startCol = startCol
      }
      if (endCol > -1) {
        this.endRow = lineNdx
        this.endCol = endCol
      }
      return line.split('')
    })
    this._findPath()
  }

  _findPath() {
    let row = this.startRow
    let col = this.startCol
    let ndx = 0
    const id = coordsToId(row, col)
    this.indexToCoord = [id]
    this.coordToIndex = { [id]: ndx++ }
    while (row !== this.endRow || col !== this.endCol) {
      for (const dir of directions.primary) {
        const newRow = row + dir.rowDiff
        const newCol = col + dir.colDiff
        if (newRow < 0 || newRow > this.height) continue
        if (newCol < 0 || newCol > this.width) continue
        if (newRow === this.startRow && newCol === this.startCol) continue
        if (!(newRow === this.endRow && newCol === this.endCol) && this.grid[newRow][newCol] !== MARKERS.space) continue
        const newId = coordsToId(newRow, newCol)
        if (this.coordToIndex[newId]) continue
        row = newRow
        col = newCol
        this.indexToCoord.push(newId)
        this.coordToIndex[newId] = ndx++
        break
      }
    }
  }

  get height() { return this.grid.length }
  get width() { return this.grid[0].length }
  get path() { return this.indexToCoord }
  
  at(row, col) { return this.grid[row][col] }

  print() { this.grid.forEach(line => console.log(line.join(''))) }
}

export const solve = (data) => {
  // Parse input
  const track = new Racetrack(data)
  // For each ordered pair of spots on the track
  let count = 0
  for (let ndx1 = 0; ndx1 < track.path.length - 1; ndx1++) {
    for (let ndx2 = ndx1 + 1; ndx2 < track.path.length; ndx2++) {
      // Check for a valid cheat
      const [startRow, startCol] = idToCoords(track.indexToCoord[ndx1])
      const [endRow, endCol] = idToCoords(track.indexToCoord[ndx2])
      const manhattanDiff = Math.abs(endRow - startRow) + Math.abs(endCol - startCol)
      if (manhattanDiff > MAX_CHEAT) continue
      // Calculate savings
      const savings = ndx2 - ndx1 - manhattanDiff
      if (savings >= MIN_SAVINGS) count++
    }
  }
  console.log(count)
}
