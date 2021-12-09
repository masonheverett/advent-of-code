import _ from 'lodash'

export const solve = (data) => {
  const grid = data.map(line => line.split('').map(Number))
  const lowPoints = []

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (
        (row === 0 || grid[row][col] < grid[row - 1][col]) &&
        (col === grid[row].length - 1 || grid[row][col] < grid[row][col + 1]) &&
        (row === grid.length - 1 || grid[row][col] < grid[row + 1][col]) &&
        (col === 0 || grid[row][col] < grid[row][col - 1])
      ) {
        lowPoints.push([row, col])
      }
    }
  }

  const basins = lowPoints.map(point => getBasin(grid, point[0], point[1]))
  const largestSizes = _.take(_.sortBy(basins, basin => basin.length * -1), 3).map(basin => basin.length)
  console.log(largestSizes[0] * largestSizes[1] * largestSizes[2])
}

// AKA Breadth-First Search
const getBasin = (grid, row, col) => {
  const basin = []

  const visited = {}
  visited[`${row},${col}`] = true

  const queue = []
  queue.push([row, col])

  while (queue.length > 0) {
    const point = _.pullAt(queue, [0])[0]
    basin.push(point)

    // UP
    if (
      point[0] > 0 &&
      grid[point[0] - 1][point[1]] < 9 &&
      visited[`${point[0] - 1},${point[1]}`] !== true
    ) {
      visited[`${point[0] - 1},${point[1]}`] = true
      queue.push([point[0] - 1, point[1]])
    }
    // RIGHT
    if (
      point[1] < grid[0].length - 1 &&
      grid[point[0]][point[1] + 1] < 9 &&
      visited[`${point[0]},${point[1] + 1}`] !== true
    ) {
      visited[`${point[0]},${point[1] + 1}`] = true
      queue.push([point[0], point[1] + 1])
    }
    // DOWN
    if (
      point[0] < grid.length - 1 &&
      grid[point[0] + 1][point[1]] < 9 &&
      visited[`${point[0] + 1},${point[1]}`] !== true
    ) {
      visited[`${point[0] + 1},${point[1]}`] = true
      queue.push([point[0] + 1, point[1]])
    }
    // LEFT
    if (
      point[1] > 0 &&
      grid[point[0]][point[1] - 1] < 9 &&
      visited[`${point[0]},${point[1] - 1}`] !== true
    ) {
      visited[`${point[0]},${point[1] - 1}`] = true
      queue.push([point[0], point[1] - 1])
    }
  }

  return basin
}
