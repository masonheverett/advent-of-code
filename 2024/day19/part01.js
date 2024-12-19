import _ from 'lodash'

export class MaxHeap {
  _heap = []

  cost(node) { return node }

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
      let pNdx = this.getParentIndex(ndx)
      if (this.cost(this._heap[pNdx]) < this.cost(this._heap[ndx])) {
        this.swap(pNdx, ndx)
        ndx = pNdx
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
      let lChildNdx = this.getLeftChildIndex(ndx)
      let rChildNdx = this.getRightChildIndex(ndx)
      if (rChildNdx < this.size && this.cost(this._heap[rChildNdx]) > this.cost(this._heap[lChildNdx])) {
        lChildNdx = rChildNdx
      }
      if (this.cost(this._heap[ndx]) < this.cost(this._heap[lChildNdx])) {
        this.swap(ndx, lChildNdx)
        ndx = lChildNdx
      } else {
        break
      }
    }
  }
}

export const solve = (data) => {
  // Parse towels
  const towels = new Set(data[0].split(', '))
  const maxTowelLength = _.maxBy(data[0].split(', '), towel => towel.length).length
  // Count valid patterns
  console.log(data.slice(2).filter(pattern => {
    // Create list of checked indeces
    const checked = Array(pattern.length).fill(false)
    // Create max heap of indexes to try and add 0
    const heap = new MaxHeap()
    heap.push(0)
    // While you still have indexes to try
    while (heap.size > 0) {
      // Take the largest index and mark it as checked
      const patternNdx = heap.pop()
      checked[patternNdx] = true
      // Look for matching towels from size 1 to max towel length
      for (let length = 1; length <= maxTowelLength; length++) {
        // If this has already been checked, skip it
        if (checked[patternNdx + length]) continue
        // If you find a matching towel, add the new index to the heap
        const substring = pattern.substring(patternNdx, patternNdx + length)
        if (towels.has(substring)) {
          // If you reached the end of the pattern, quit
          if (patternNdx + length === pattern.length) return true
          heap.push(patternNdx + length)
        }
      }
    }
    // No matching pattern found
    return false
  }).length)
}
