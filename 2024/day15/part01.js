import _ from 'lodash'

const ROBOT = '@'
const BOX = 'O'
const WALL = '#'
const SPACE = '.'

const DIRECTIONS = {
  '^': -100,
  '>': 1,
  'v': 100,
  '<': -1
}

export const solve = (data) => {
  let robot
  const moves = []
  const warehouse = {}
  // Parse input
  let parsingWarehouse = true
  data.forEach((line, row) => {
    if (line.length === 0) {
      parsingWarehouse = false
      return
    }
    if (parsingWarehouse) {
      line.split('').forEach((char, col) => {
        const id = coordId(row, col)
        warehouse[id] = char
        if (char === ROBOT) robot = id
      })
    } else {
      moves.push(...line.split(''))
    }
  })
  // Move
  moves.forEach(move => {
    let boxCountToPush = 0
    let diff = 0
    diff += DIRECTIONS[move]
    // Check until you hit a wall or space
    while (![WALL, SPACE].includes(warehouse[robot + diff])) {
      // Increment number of boxes to push
      boxCountToPush++
      // Check next spot
      diff += DIRECTIONS[move]
    }
    // If it is a wall, skip it all
    if (warehouse[robot + diff] === WALL) return
    // If it is a space, push them all
    // Fill the empty space with a box
    warehouse[robot + diff] = BOX
    // Replace the robot with a space
    warehouse[robot] = SPACE
    // Update the robot
    robot += DIRECTIONS[move]
    // Replace the first box with the robot
    warehouse[robot] = ROBOT
  })
  // Add up box coordinates
  console.log(_.sum(Object.entries(warehouse).map(([id, char]) => {
    return _.toNumber(char === BOX ? id : 0)
  })))
}

const coordId = (row, col) => row * 100 + col
