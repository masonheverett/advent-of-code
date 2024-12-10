import _ from 'lodash'

export const solve = (data) => {
  // Parse input into grid, noting where zeros are
  const zeros = []
  const zeroSets = {}
  const grid = data.map((line, row) => line.split('').map((char, col) => {
    if (char === '0') {
      zeros.push([row, col])
      zeroSets[coordString([row, col])] = new Set()
    }
    return _.toNumber(char)
  }))
  // For each 0, search for path to 9s (pass current coords, next number)
  zeros.forEach(zeroCoords => {
    findPaths(grid, zeroSets, zeroCoords, zeroCoords, 0)
  })
  console.log(_.sum(Object.values(zeroSets).map(set => set.size)))
}

const coordString = (coords) => {
  return `(${coords[0]},${coords[1]})`
}

const findPaths = (grid, zeroSets, zeroCoords, currCoords, number) => {
  // Check in bounds
  if (currCoords[0] < 0 || currCoords[0] >= grid.length) return false
  if (currCoords[1] < 0 || currCoords[1] >= grid[0].length) return false
  // Check number
  if (grid[currCoords[0]][currCoords[1]] !== number) return false
  // Check for 9
  if (grid[currCoords[0]][currCoords[1]] === 9 && number === 9) {
    zeroSets[coordString(zeroCoords)].add(coordString(currCoords))
    return
  }
  // Recurse in 4 directions
  findPaths(grid, zeroSets, zeroCoords, [currCoords[0] - 1, currCoords[1]], number + 1)
  findPaths(grid, zeroSets, zeroCoords, [currCoords[0], currCoords[1] + 1], number + 1)
  findPaths(grid, zeroSets, zeroCoords, [currCoords[0] + 1, currCoords[1]], number + 1)
  findPaths(grid, zeroSets, zeroCoords, [currCoords[0], currCoords[1] - 1], number + 1)
}
