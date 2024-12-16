import _ from 'lodash'

const ROBOT = '@'
const BOX = 'O'
const BOX_LEFT = '['
const BOX_RIGHT = ']'
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
  let height, width = data[0].length * 2
  // Parse input
  let parsingWarehouse = true
  data.forEach((line, row) => {
    if (line.length === 0) {
      parsingWarehouse = false
      height = row
      return
    }
    if (parsingWarehouse) {
      line.split('').forEach((char, col) => {
        const id = coordId(row, col * 2)
        if (char === ROBOT) {
          robot = id
          warehouse[id] = ROBOT
          warehouse[id + 1] = SPACE
        } else if (char === BOX) {
          warehouse[id] = BOX_LEFT
          warehouse[id + 1] = BOX_RIGHT
        } else {
          warehouse[id] = char
          warehouse[id + 1] = char
        }
      })
    } else {
      moves.push(...line.split(''))
    }
  })
  // Move
  moves.forEach(move => {
    if (['>', '<'].includes(move)) {
      // If left or right
      let boxCountToPush = 0
      let diff = 0
      diff += DIRECTIONS[move]
      // Check until you hit a wall or space
      while (![WALL, SPACE].includes(warehouse[robot + diff])) {
        // Increment number of boxes to push
        boxCountToPush++
        // Check next spot
        diff += 2 * DIRECTIONS[move]
      }
      // If it is a wall, skip it all
      if (warehouse[robot + diff] === WALL) return
      // If it is a space, push them all
      _.times(boxCountToPush, () => {
        warehouse[robot + diff] = move === '<' ? BOX_LEFT : BOX_RIGHT
        diff -= DIRECTIONS[move]
        warehouse[robot + diff] = move === '<' ? BOX_RIGHT : BOX_LEFT
        diff -= DIRECTIONS[move]
      })
      warehouse[robot + diff] = ROBOT
      warehouse[robot] = SPACE
      robot += diff
    } else {
      // If up or down
      let diff = 0
      diff += DIRECTIONS[move]
      // If there is a wall, skip it
      if (warehouse[robot + diff] === WALL) return
      // If there is a space, move the robot
      if (warehouse[robot + diff] === SPACE) {
        warehouse[robot + diff] = ROBOT
        warehouse[robot] = SPACE
        robot += diff
        return
      }
      // Look at all affected spots in next row until you find a wall or the list is all spaces
      // For each that is a box, add to affected spots for the row after
      const allBoxSpots = new Set()
      let rowBoxSpots = new Set()
      rowBoxSpots.add(robot + diff)
      allBoxSpots.add(robot + diff)
      let boxRows = 0
      rowBoxSpots.add(warehouse[robot + diff] === BOX_LEFT ? robot + diff + 1 : robot + diff - 1)
      allBoxSpots.add(warehouse[robot + diff] === BOX_LEFT ? robot + diff + 1 : robot + diff - 1)
      while (rowBoxSpots.size > 0) {
        boxRows++
        let nextRowBoxSpots = new Set()
        for (const spot of rowBoxSpots.values()) {
          if (warehouse[spot + diff] === WALL) return
          if (warehouse[spot + diff] === SPACE) continue
          nextRowBoxSpots.add(spot + diff)
          allBoxSpots.add(spot + diff)
          nextRowBoxSpots.add(warehouse[spot + diff] === BOX_LEFT ? spot + diff + 1 : spot + diff - 1)
          allBoxSpots.add(warehouse[spot + diff] === BOX_LEFT ? spot + diff + 1 : spot + diff - 1)
        }
        rowBoxSpots = nextRowBoxSpots
      }
      // Identify all next box spots
      const nextAllBoxSpots = new Set()
      for (const spot of allBoxSpots.values()) {
        nextAllBoxSpots.add(spot + diff)
      }
      // Move all boxes
      const warehouseBoxes = _.fromPairs(Array.from(allBoxSpots.values()).map(spot => [spot, warehouse[spot]]))
      for (const spot of allBoxSpots.values()) {
        warehouse[spot + diff] = warehouseBoxes[spot]
      }
      Array.from(allBoxSpots.values()).forEach(spot => {
        if (!nextAllBoxSpots.has(spot)) warehouse[spot] = SPACE
      })
      // Move robot
      warehouse[robot] = SPACE
      warehouse[robot + diff] = ROBOT
      robot += diff
    }
  })
  // Add up box coordinates
  console.log(_.sum(Object.entries(warehouse).map(([id, char]) => {
    return _.toNumber(char === BOX_LEFT ? id : 0)
  })))
}

const coordId = (row, col) => row * 100 + col

const printWarehouse = (warehouse, height, width) => {
  const grid = Array(height)
  for (let n = 0; n < height; n++) grid[n] = Array(width)
  Object.entries(warehouse).forEach(([id, char]) => grid[Math.round(id / 100)][id % 100] = char)
  grid.forEach(line => console.log(line.join('')))
}
