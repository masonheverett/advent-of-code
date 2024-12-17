import _ from 'lodash'

const TURN_COST = 1000
const MOVE_COST = 1

const MARKERS = {
  start: 'S',
  end: 'E',
  space: '.'
}

const DIRECTIONS = {
  north: { diffs: [-1, 0], left: 'west', right: 'east' },
  east: { diffs: [0, 1], left: 'north', right: 'south' },
  south: { diffs: [1, 0], left: 'east', right: 'west' },
  west: { diffs: [0, -1], left: 'south', right: 'north' }
}

const rc2s = ([r, c]) => `${r},${c}`
const rcd2s = (rc, d) => rc2s(rc) + ',' + rc2s(d.diffs)

class HeapNode {
  constructor(row, col, direction, cost) {
    this.row = row
    this.col = col
    this.direction = direction
    this.cost = cost
  }

  get id() { return rcd2s([this.row, this.col], this.direction) }
}

class MinHeap {
  _heap = []
  
  get size() { return this._heap.length }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }
  
  getLeftChildIndex(index) {
    return 2 * index + 1
  }

  getRightChildIndex(index) {
    return 2 * index + 2
  }

  swap(index1, index2) {
    [this._heap[index1], this._heap[index2]] = [this._heap[index2], this._heap[index1]]
  }

  push(node) {
    this._heap.push(node)
    this.heapifyUp()
  }

  heapifyUp() {
    let index = this.size - 1
    while (index > 0) {
      let parentIndex = this.getParentIndex(index)
      if (this._heap[parentIndex].cost > this._heap[index].cost) {
        this.swap(parentIndex, index)
        index = parentIndex
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
    let index = 0
    while (this.getLeftChildIndex(index) < this.size) {
      let smallerChildIndex = this.getLeftChildIndex(index)
      let rightChildIndex = this.getRightChildIndex(index)
      if (rightChildIndex < this.size && this._heap[rightChildIndex].cost < this._heap[smallerChildIndex].cost) {
        smallerChildIndex = rightChildIndex
      }
      if (this._heap[index].cost > this._heap[smallerChildIndex].cost) {
        this.swap(index, smallerChildIndex)
        index = smallerChildIndex
      } else {
        break
      }
    }
  }
}

export const solve = (data) => {
  // Use Dijkstra's algorithm to find the shortest path between start and end
  // Create a list of distances to all other spots
  const costs = {}
  let startRow, startCol, endRow, endCol
  data.forEach((line, row) => line.split('').forEach((char, col) => {
    if (![MARKERS.start, MARKERS.end, MARKERS.space].includes(char)) return
    // Mark start cost as 0
    if (char === MARKERS.start) {
      startRow = row
      startCol = col
      costs[rcd2s([row, col], DIRECTIONS.east)] = 0
      costs[rcd2s([row, col], DIRECTIONS.north)] = Number.POSITIVE_INFINITY
      costs[rcd2s([row, col], DIRECTIONS.south)] = Number.POSITIVE_INFINITY
      costs[rcd2s([row, col], DIRECTIONS.west)] = Number.POSITIVE_INFINITY
      return
    }
    if (char === MARKERS.end) {
      endRow = row
      endCol = col
    }
    // Mark cost of everything else as Infinity
    costs[rcd2s([row, col], DIRECTIONS.north)] = Number.POSITIVE_INFINITY
    costs[rcd2s([row, col], DIRECTIONS.east)] = Number.POSITIVE_INFINITY
    costs[rcd2s([row, col], DIRECTIONS.south)] = Number.POSITIVE_INFINITY
    costs[rcd2s([row, col], DIRECTIONS.west)] = Number.POSITIVE_INFINITY
  }))
  // Create map of cheapest predecessors, allowing ties
  const predecessors = {}
  // Create set of visited nodes
  const visited = new Set()
  // Add start to heap
  const heap = new MinHeap()
  heap.push(new HeapNode(startRow, startCol, DIRECTIONS.east, 0))
  // While heap is not empty
  while (heap.size > 0) {
    // Take smallest from heap
    const current = heap.pop()
    // Define neighbors
    const neighbors = [
      // Move forward one
      {
        row: current.row + current.direction.diffs[0],
        col: current.col + current.direction.diffs[1],
        direction: current.direction,
        cost: MOVE_COST
      },
      // Turn left
      {
        row: current.row,
        col: current.col,
        direction: DIRECTIONS[current.direction.left],
        cost: TURN_COST
      },
      // Turn right
      {
        row: current.row,
        col: current.col,
        direction: DIRECTIONS[current.direction.right],
        cost: TURN_COST
      }
    ]
    // Check neighbors
    neighbors.forEach(n => {
      const neighborId = rcd2s([n.row, n.col], n.direction)
      // If neighbor isn't a space, skip it
      if (costs[neighborId] === undefined) return
      // If neighbor has been visited, skip it
      if (visited.has(neighborId)) return
      if (current.cost + n.cost < costs[neighborId]) {
        costs[neighborId] = current.cost + n.cost
        predecessors[neighborId] = new Set()
        predecessors[neighborId].add(current.id)
      } else if (current.cost + n.cost === costs[neighborId]) {
        if (!predecessors[neighborId]) predecessors[neighborId] = new Set()
        predecessors[neighborId].add(current.id)
      }
      heap.push(new HeapNode(n.row, n.col, n.direction, costs[neighborId]))
    })
    // Mark current spot as visited
    visited.add(current.id)
  }
  // Find end state
  const ends = Object.entries(costs).filter(([id]) => {
    const arr = id.split(',')
    return endRow === _.toNumber(arr[0]) && endCol === _.toNumber(arr[1])
  })
  const minCost = _.min(ends)[1]
  const minEndIds = ends.filter(([id, cost]) => cost === minCost).map(([id, cost]) => id)
  // Find spaces in shortest paths
  let currentSpots = minEndIds
  const spaces = new Set()
  spaces.add(ends[0][0].split(',').slice(0,2).join(','))
  while (currentSpots.length > 0) {
    let newSpots = []
    // Add predecessors to space
    currentSpots.forEach(id => {
      if (!predecessors[id]) return
      predecessors[id].forEach(pre => {
        spaces.add(pre.split(',').slice(0,2).join(','))
      })
      newSpots.push(...Array.from(predecessors[id].values()))
    })
    // Set new current as predecessors of current
    currentSpots = newSpots
  }
  console.log(spaces.size)
}
