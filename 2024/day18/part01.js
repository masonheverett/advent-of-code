import _ from 'lodash'

const RANGE = 71
const TIME = 1024
const DIRECTIONS = [[0, 1],[1, 0],[0, -1],[-1, 0]]

const coordsToId = (row, col) => row * 100 + col

class HeapNode {
  constructor(row, col, cost) {
    this.cost = cost
    this.row = row
    this.col = col
  }

  get id() { return coordsToId(this.row, this.col) }
}

export class MinHeap {
  _heap = []
  
  cost(index) {
    const node = this._heap[index]
    return node.cost + Math.abs(node.row - node.col)
  }

  get size() { return this._heap.length }

  getParentIndex(index) { return Math.floor((index - 1) / 2) }
  getLeftChildIndex(index) { return 2 * index + 1 }
  getRightChildIndex(index) { return 2 * index + 2 }

  swap(index1, index2) { [this._heap[index1], this._heap[index2]] = [this._heap[index2], this._heap[index1]] }

  push(node) {
    this._heap.push(node)
    this.heapifyUp()
  }

  heapifyUp() {
    let index = this.size - 1
    while (index > 0) {
      let parentIndex = this.getParentIndex(index)
      if (this.cost(parentIndex) > this.cost(index)) {
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
      if (rightChildIndex < this.size && this.cost(rightChildIndex) < this.cost(smallerChildIndex)) {
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
  // Use A* algorithm to find the shortest path between start and end
  // Create a list of distances to all other spots
  const costs = {}
  for (let r = 0; r < RANGE; r++) {
    for (let c = 0; c < RANGE; c++) {
      costs[coordsToId(r, c)] = Number.POSITIVE_INFINITY
    }
  }
  data.slice(0, TIME).forEach(str => {
    const [col, row] = str.split(',').map(n => parseInt(n))
    delete costs[coordsToId(row, col)]
  })
  // Create set of visited nodes
  const visited = new Set()
  // Create heap
  const heap = new MinHeap()
  // Add start to heap
  heap.push(new HeapNode(0, 0, 0))
  // While heap is not empty
  while (heap.size > 0) {
    // Take smallest from heap
    const current = heap.pop()
    // Check neighbors
    DIRECTIONS.forEach(dir => {
      // Neighbor doesn't exist, skip it
      const neighborId = coordsToId(current.row + dir[0], current.col + dir[1])
      if (costs[neighborId] === undefined) return
      // If neighbor has been visited, skip it
      if (visited.has(neighborId)) return
      // If you found a shorter path, mark it
      if (current.cost + 1 < costs[neighborId]) costs[neighborId] = current.cost + 1
      // Add neighbor to the heap
      heap.push(new HeapNode(current.row + dir[0], current.col + dir[1], costs[neighborId]))
    })
    // Mark current spot as visited
    visited.add(current.id)
  }
  console.log(costs[coordsToId(RANGE - 1, RANGE - 1)])
}
