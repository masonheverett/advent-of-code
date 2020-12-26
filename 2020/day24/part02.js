const _ = require('lodash')

const solve = (data) => {
  const pairs = toPairs(data)
  const grid = toGrid(pairs)
  _.times(100, (day) => {
    addSpace(grid)
    flipTiles(grid)
    console.log(`Day ${day + 1}: ${totalBlackTiles(grid)}`)
  })
}

const toPairs = (data) => {
  return data.map((line, i) => {
    let ew = 0
    let ns = 0
    let index = 0
    while (index < line.length) {
      const move = ['e', 'w'].includes(line[index]) ? line.substr(index, 1) : line.substr(index, 2)
      if (['e', 'w'].includes(move)) {
        ew += move === 'e' ? 1 : -1
        index++
      } else {
         ns += move[0] === 'n' ? 1 : -1
         ew += move[1] === 'e' ? 0.5 : -0.5
         index += 2
      }
    }
    return [Math.floor(ew), ns]
  })
}

const toGrid = (pairs) => {
  const xMin = _.minBy(pairs, (pair) => pair[0])[0]
  const xMax = _.maxBy(pairs, (pair) => pair[0])[0]
  const yMin = _.minBy(pairs, (pair) => pair[1])[1]
  const yMax = _.maxBy(pairs, (pair) => pair[1])[1]
  const grid = _.times(yMax - yMin + 1, () => _.times(xMax - xMin + 1, _.constant('.')))
  pairs.forEach((pair) => {
    grid[pair[1] - yMin][pair[0] - xMin] = grid[pair[1] - yMin][pair[0] - xMin] === '.' ? '#' : '.'
  })
  return grid
}

const addSpace = (grid) => {
  grid.forEach((row) => {
    row.unshift('.')
    row.push('.')
  })
  const rowLength = grid[0].length
  grid.unshift(_.times(rowLength, _.constant('.')))
  grid.push(_.times(rowLength, _.constant('.')))
}

const flipTiles = (grid) => {
  const oldGrid = _.cloneDeep(grid)
  oldGrid.forEach((row, y) => {
    row.forEach((tile, x) => {
      const blackTileCount = blackTileNeighbors(oldGrid, x, y)
      if (tile === '.') {
        grid[y][x] = blackTileCount === 2 ? '#' : '.'
      } else {
        grid[y][x] = blackTileCount === 0 || blackTileCount > 2 ? '.' : '#'
      }
    })
  })
}

const blackTileNeighbors = (grid, x, y) => {
  let blackTileCount = 0
  const shiftRow = shouldShiftRow(y, grid)
  const deltas = [-1, 0, 1]
  deltas.forEach((dy) => {
    deltas.forEach((dx) => {
      if (dy === 0 && dx === 0) return
      if (shiftRow && dy !== 0 && dx === -1) return
      if (!shiftRow && dy !== 0 && dx === 1) return
      const ny = y + dy
      const nx = x + dx
      if (ny < 0 || nx < 0) return
      if (ny >= grid.length || nx >= grid[0].length) return
      if (grid[ny][nx] === '#') blackTileCount++
    })
  })
  return blackTileCount
}

const totalBlackTiles = (grid) => {
  return _.sumBy(grid, (row) => {
    return _.sumBy(row, (tile) => tile === '#' ? 1 : 0)
  })
}

const shouldShiftRow = (index, grid) => {
  return index % 2 === ((grid.length - 1) % 4 === 0 ? 1 : 0)
}

const printGrid = (grid) => {
  const copy = _.cloneDeep(grid)
  copy.reverse().forEach((row, index) => {
    let rowString = row.join('   ')
    if (shouldShiftRow(index, grid)) rowString = `  ${rowString}`
    console.log(rowString)
  })
}

module.exports = { solve }
