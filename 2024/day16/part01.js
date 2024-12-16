import _ from 'lodash'

const MARKERS = {
  start: 'S',
  end: 'E',
  wall: '#',
  space: '.',
  reindeer: 'R',
  visited: '@'
}

const DIRECTIONS = {
  north: [-1, 0],
  east: [0, 1],
  south: [1, 0],
  west: [0, -1]
}

class Reindeer {
  constructor(maze, cost, direction, location) {
    this.maze = maze
    this.cost = cost
    this.direction = direction ? direction : DIRECTIONS.east
    if (location) {
      this.location = location
    } else {
      const rowNdx = this.maze.findIndex(row => row.includes(MARKERS.start))
      this.location = [rowNdx, this.maze[rowNdx].indexOf(MARKERS.start)]
    }
  }

  print() {
    console.log(`Direction: ${this.direction}\nCost: ${this.cost}`)
    this.maze.forEach((row, r) => {
      console.log(row.map((spot, c) => {
        if (this.location[0] === r && this.location[1] === c) return MARKERS.reindeer
        return spot
      }).join(''))
    })
  }
}

export const solve = (data) => {
  const reindeer = new Reindeer(data.map(line => line.split('')), 0)
  reindeer.print()
  // Use Dijkstra's algorithm to find the shortest path between start and end
}
