import _ from 'lodash'
import directions from '../util/directions.js'

const MIN_SAVINGS = 100

const MARKERS = {
  space: '.',
  wall: '#',
  start: 'S',
  end: 'E'
}

const coordsToId = (row, col) => `${row},${col}`
const idToCoords = (str) => str.split(',').map(char => _.toNumber(char))

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
  }

  findPath() {
    let row = this.startRow
    let col = this.startCol
    let ndx = 0
    const id = coordsToId(row, col)
    this.indexToCoords = [id]
    this.coordsToIndex = { [id]: ndx++ }
    while (row !== this.endRow || col !== this.endCol) {
      for (const dir of directions.primary) {
        const newRow = row + dir.rowDiff
        const newCol = col + dir.colDiff
        if (newRow < 0 || newRow > this.height) continue
        if (newCol < 0 || newCol > this.width) continue
        if (this.grid[newRow][newCol] === MARKERS.wall) continue
        const newId = coordsToId(newRow, newCol)
        if (this.coordsToIndex[newId]) continue
        row = newRow
        col = newCol
        this.indexToCoords.push(newId)
        this.coordsToIndex[newId] = ndx++
        break
      }
    }
  }

  get height() { return this.grid.length }
  get width() { return this.grid[0].length }
  get path() { return this.indexToCoords }
  
  at(row, col) { return this.grid[row][col] }

  print() { this.grid.forEach(line => console.log(line.join(''))) }
}


export const solve = (data) => {
  // Parse input
  const track = new Racetrack(data)
  // Find the path
  track.findPath()
  // For each spot on the track
  let count = 0
  track.path.forEach(spot => {
    const [row, col] = idToCoords(spot)
    // Cheat in each direction
    for (const dir of directions.primary) {
      const newRow = row + dir.rowDiff * 2
      const newCol = col + dir.colDiff * 2
      if (newRow < 0 || newRow >= track.height) continue
      if (newCol < 0 || newCol >= track.width) continue
      if (track.at(newRow, newCol) === MARKERS.wall) continue
      const wallRow = row + dir.rowDiff
      const wallCol = col + dir.colDiff
      if (track.at(wallRow, wallCol) !== MARKERS.wall) continue
      // If you hit another spot, calculate difference
      const currentNdx = track.coordsToIndex[coordsToId(row, col)]
      const nextNdx = track.coordsToIndex[coordsToId(newRow, newCol)]
      const savings = MIN_SAVINGS + 2
      if (nextNdx - savings < currentNdx) continue
      count++
    }
  })
  console.log(count)
}
