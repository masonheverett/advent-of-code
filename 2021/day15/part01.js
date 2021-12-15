import _ from 'lodash'

class Graph {
  constructor(data) {
    this.vertices = []
    this.adjacencyList = {}
    const grid = data.map(line => line.split('').map(Number))
    this.gridLength = grid.length
    this.gridWidth = grid[0].length
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        this.addVertex(`${row},${col}`)
        if (row > 0) this.addEdge(`${row},${col}`, `${row - 1},${col}`, grid[row - 1][col])
        if (row < grid.length - 1) this.addEdge(`${row},${col}`, `${row + 1},${col}`, grid[row + 1][col])
        if (col > 0) this.addEdge(`${row},${col}`, `${row},${col - 1}`, grid[row][col - 1])
        if (col < grid[row].length - 1) this.addEdge(`${row},${col}`, `${row },${col + 1}`, grid[row][col + 1])
      }
    }
  }

  addVertex(vertex) {
    this.vertices.push(vertex)
    this.adjacencyList[vertex] = {}
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight
  }

  dijkstra(source, target) {
    const distances = {}
    distances[source] = 0
    const visited = new Set()
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] !== source) distances[this.vertices[i]] = Infinity
    }
    let currentVertex = this.vertexWithMinDistance(distances, visited)
    while (currentVertex !== null) {
      const distance = distances[currentVertex]
      const neighbors = this.adjacencyList[currentVertex]
      for (let neighbor in neighbors) {
        const newDistance = distance + neighbors[neighbor]
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance
        }
      }
      visited.add(currentVertex)
      currentVertex = this.vertexWithMinDistance(distances, visited)
    }
    return distances[target]
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity
    let minVertex = null
    for (let vertex in distances) {
      const distance = distances[vertex]
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance
        minVertex = vertex
      }
    }
    return minVertex
  }
}

export const solve = (data) => {
  const graph = new Graph(data)
  console.log(graph.dijkstra('0,0', `${graph.gridLength - 1},${graph.gridWidth - 1}`))
}
