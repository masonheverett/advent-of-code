import _ from 'lodash'
import intcode from '../shared/intcode.js'

export const solve = (data) => {
  const parsedData = data[0].split(',').map(Number)
  let state = { data: parsedData }
  let grid = []
  let score = 0
  let nextMove = 0
  let firstMove = true
  while (!isFinished(grid)) {
    state = intcode(state, nextMove)
    if (firstMove) {
      nextMove = 0
      firstMove = false
    } else {
      nextMove = getNextMove(state)
    }
    score = updateGrid(state, grid, score)
    console.log(`SCORE: ${score}`)
  }
}

const isFinished = (grid) => {
  if (_.isEmpty(grid)) return false
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 2) return false
    }
  }
  return true
}

const getNextMove = (state) => {
  const ball = _.findLast(_.chunk(state.output, 3), (move) => move[2] === 4)[0]
  const paddle = _.findLast(_.chunk(state.output, 3), (move) => move[2] === 3)[0]
  return ball > paddle ? 1 : ball < paddle ? -1 : 0
}

const updateGrid = (state, grid, score) => {
  const newOutput = state.output.slice(state.nextOutput)
  for (let i = 0; i < newOutput.length; i += 3) {
    const x = newOutput[i]
    const y = newOutput[i + 1]
    const type = newOutput[i + 2]
    if (x !== -1) {
      if (grid[x] === undefined) grid[x] = []
      grid[x][y] = type
    } else {
      score = type
    }
    state.nextOutput += 3
  }
  printGrid(grid)
  return score
}


const printGrid = (grid) => {
  for (let y = 0; y < grid[0].length; y++) {
    let line = ''
    for (let x = 0; x < grid.length; x++) {
      line += sprites[grid[x][y]]
    }
    console.log(line)
  }
}

const sprites = [' ', '■', '□', '▬', '●']
