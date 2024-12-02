import _ from 'lodash'

const expandData = (data) => {
  const expandedRight = []
  data.forEach(line => {
    let expandedLine = _.cloneDeep(line)
    for (let i = 1; i < 5; i++) {
      expandedLine += copyLineSegment(line, i)
    }
    expandedRight.push(expandedLine)
  })
  const expandedDown = _.cloneDeep(expandedRight)
  for (let i = 1; i < 5; i++) {
    expandedRight.forEach(line => {
      expandedDown.push(copyLineSegment(line, i))
    })
  }
  return expandedDown
}

const copyLineSegment = (line, toAdd) => {
  return line.split('').map(Number).map(num => {
    if (num + toAdd > 9) return (num + toAdd + 1) % 10
    else return num + toAdd
  }).join('')
}

export const solve = (data) => {
  const expandedData = expandData(data)
  const graph = new Graph(expandedData)
  console.log(graph.findPath('0,0', `${graph.gridLength - 1},${graph.gridWidth - 1}`))
}

class Graph {
  constructor(data) {
    this.nodes = []
    this.adjacencyList = {}
    const grid = data.map(line => line.split('').map(Number))
    this.gridLength = grid.length
    this.gridWidth = grid[0].length
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        this.addNode(`${row},${col}`)
        if (row > 0) this.addEdge(`${row},${col}`, `${row - 1},${col}`, grid[row - 1][col])
        if (row < grid.length - 1) this.addEdge(`${row},${col}`, `${row + 1},${col}`, grid[row + 1][col])
        if (col > 0) this.addEdge(`${row},${col}`, `${row},${col - 1}`, grid[row][col - 1])
        if (col < grid[row].length - 1) this.addEdge(`${row},${col}`, `${row},${col + 1}`, grid[row][col + 1])
      }
    }
  }

  addNode(node) {
    this.nodes.push(node)
    this.adjacencyList[node] = []
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight })
  }

  findPath(startNode, endNode) {
    let costs = {}
    let pq = new PriorityQueue()

    costs[startNode] = 0
    this.nodes.forEach(node => {
      if (node !== startNode) {
        costs[node] = Infinity
      }
    })

    pq.enqueue([startNode, 0])
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue()
      let currentNode = shortestStep[0]
      this.adjacencyList[currentNode].forEach(neighbor => {
        let cost = costs[currentNode] + neighbor.weight
        if (cost < costs[neighbor.node]) {
          costs[neighbor.node] = cost
          pq.enqueue([neighbor.node, cost])
        }
      })
    }

    return costs[endNode]
  }
}

class PriorityQueue {
  constructor() {
    this.collection = []
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element)
    } else {
      let added = false
      for (let i = 0; i < this.collection.length; i++) {
        if (element[1] < this.collection[i][1]) {
          this.collection.splice(i, 0, element)
          added = true
          break
        }
      }
      if (!added) {
        this.collection.push(element)
      }
    }
  }

  dequeue() {
    return this.collection.shift()
  }

  isEmpty() {
    return this.collection.length === 0
  }
}
