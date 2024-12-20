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

class HeapNode {
  constructor(row, col, cost) {
    this.cost = cost
    this.row = row
    this.col = col
  }

  get id() { return coordsToId(this.row, this.col) }
}

class MinHeap {
  _heap = []
  
  cost(node) { return node.cost }

  get size() { return this._heap.length }

  getParentIndex(ndx) { return Math.floor((ndx - 1) / 2) }
  getLeftChildIndex(ndx) { return 2 * ndx + 1 }
  getRightChildIndex(ndx) { return 2 * ndx + 2 }

  swap(ndx1, ndx2) { [this._heap[ndx1], this._heap[ndx2]] = [this._heap[ndx2], this._heap[ndx1]] }

  push(node) {
    this._heap.push(node)
    this.heapifyUp()
  }

  heapifyUp() {
    let ndx = this.size - 1
    while (ndx > 0) {
      let parentNdx = this.getParentIndex(ndx)
      if (this.cost(this._heap[parentNdx]) > this.cost(this._heap[ndx])) {
        this.swap(parentNdx, ndx)
        ndx = parentNdx
      } else {
        break
      }
    }
  }

  pop() {
    if (this.size === 0) return null
    if (this.size === 1) return this._heap.pop()
    const min = this._heap[0]
    this._heap[0] = this._heap.pop()
    this.heapifyDown()
    return min
  }

  heapifyDown() {
    let ndx = 0
    while (this.getLeftChildIndex(ndx) < this.size) {
      let sChildNdx = this.getLeftChildIndex(ndx)
      let rChildNdx = this.getRightChildIndex(ndx)
      if (rChildNdx < this.size && this.cost(this._heap[rChildNdx]) < this.cost(this._heap[sChildNdx])) {
        sChildNdx = rChildNdx
      }
      if (this.cost(this._heap[ndx]) > this.cost(this._heap[sChildNdx])) {
        this.swap(ndx, sChildNdx)
        ndx = sChildNdx
      } else {
        break
      }
    }
  }
}

class Grid {
  constructor(data) {
    this.g = data.map((line, lineNdx) => {
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

  get height() { return this.g.length }
  get width() { return this.g[0].length }

  hasWall(row, col) { return this.g[row][col] === MARKERS.wall }
  removeWall(row, col) { this.g[row][col] = MARKERS.space }

  runDijkstra() {
    // Clear costs and visited
    this.costs = {}
    this.visited = {}
    // Initialize costs and visited
    for (let r = 1; r < this.height - 1; r++) {
      for (let c = 1; c < this.width - 1; c++) {
        if (!this.hasWall(r, c)) {
          this.costs[coordsToId(r, c)] = Number.POSITIVE_INFINITY
          this.visited[coordsToId(r, c)] = false
        }
      }
    }
    // Create heap and push start
    const heap = new MinHeap()
    heap.push(new HeapNode(this.startRow, this.startCol, 0))
    // Process heap
    while (heap.size > 0) {
      // Pop from heap
      const current = heap.pop()
      // Stop if you're at the end
      if (current.row === this.endRow && current.col === this.endCol) break
      // Check neighbors
      directions.primary.forEach(dir => {
        const neighborRow = current.row + dir.rowDiff
        const neighborCol = current.col + dir.colDiff
        const neighborId = coordsToId(neighborRow, neighborCol)
        // If neighbor isn't a space, skip it
        if (this.costs[neighborId] === undefined) return
        // If neighbor has been visited, skip it
        if (this.visited[neighborId]) return
        // If you found a shorter path, update costs
        if (current.cost + 1 < this.costs[neighborId]) this.costs[neighborId] = current.cost + 1
        // Add neighbor to the heap
        heap.push(new HeapNode(neighborRow, neighborCol, this.costs[neighborId]))
      })
      // Mark current as visited
      this.visited[coordsToId(current.row, current.col)] = true
    }
  }

  get shortestPathLength() { return this.costs[coordsToId(this.endRow, this.endCol)] }

  print() { this.g.forEach(line => console.log(line.join(''))) }
}

export const solve = (data) => {
  const oGrid = new Grid(data)
  oGrid.runDijkstra()
  const oLength = oGrid.shortestPathLength
  let shorterCount = 0
  for (let r = 1; r < oGrid.height - 1; r++) {
    for (let c = 1; c < oGrid.width - 1; c++) {
      if (!oGrid.hasWall(r, c)) continue
      const grid = _.cloneDeep(oGrid)
      grid.removeWall(r, c)
      grid.runDijkstra()
      if (grid.shortestPathLength + MIN_SAVINGS <= oLength) shorterCount++
    }
  }
  console.log(shorterCount)
}
