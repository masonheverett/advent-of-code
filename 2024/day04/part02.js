import _ from 'lodash'

export const solve = (data) => {
  const grid = data.map(line => line.split(''))
  console.log(_.sum(grid.map((line, rowNum) => {
    return _.sum(line.map((char, colNum) => {
      // Invalid top left letter
      if (char !== 'M' && char !== 'S') return 0
      // Out of bounds
      if (rowNum > grid.length - 3) return 0
      if (colNum > line.length - 3) return 0
      // No middle A
      if (grid[rowNum + 1][colNum + 1] !== 'A') return 0
      // Wrong bottom right letter
      const correctBottomRight = char === 'M' ? 'S' : 'M'
      if (grid[rowNum + 2][colNum + 2] !== correctBottomRight) return 0
      const bottomLeft = grid[rowNum + 2][colNum]
      // Invalid bottom left letter
      if (bottomLeft !== 'M' && bottomLeft !== 'S') return 0
      const correctTopRight = bottomLeft === 'M' ? 'S' : 'M'
      const topRight = grid[rowNum][colNum + 2]
      // Wrong top right letter
      if (correctTopRight !== topRight) return 0
      return 1
    }))
  })))
}
