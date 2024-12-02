import _ from 'lodash'

export const solve = (data) => {
  const grid = data.map(line => line.split('').map(Number))
  let riskLevel = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (
        (row === 0 || grid[row][col] < grid[row - 1][col]) &&
        (col === grid[row].length - 1 || grid[row][col] < grid[row][col + 1]) &&
        (row === grid.length - 1 || grid[row][col] < grid[row + 1][col]) &&
        (col === 0 || grid[row][col] < grid[row][col - 1])
      ) {
        riskLevel += (1 + grid[row][col])
      }
    }
  }

  console.log(riskLevel)
}
