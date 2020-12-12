const _ = require('lodash')

const NORTH = 'N'
const SOUTH = 'S'
const EAST = 'E'
const WEST = 'W'
const LEFT = 'L'
const RIGHT = 'R'
const FORWARD = 'F'
let pos = { x: 0, y: 0 }
let dir = EAST

const solve = (data) => {

  _.forEach(data, (inst) => {
    const dist = parseInt(inst.substring(1))
    switch (inst[0]) {
      case NORTH:
        pos.y += dist
        break;
      case SOUTH:
        pos.y -= dist
        break;
      case EAST:
        pos.x += dist
        break;
      case WEST:
        pos.x -= dist
        break;
      case LEFT:
        for (i = 0; i < dist; i += 90) {
          turnLeft()
        }
        break;
      case RIGHT:
        for (i = 0; i < dist; i += 90) {
          turnRight()
        }
        break;
      case FORWARD:
        forward(dist)
        break;
    }
  })
  const manhattanDistance = Math.abs(pos.x) + Math.abs(pos.y)
  console.log(manhattanDistance)
}

const turnLeft = () => {
  switch (dir) {
    case NORTH:
      dir = WEST
      break;
    case SOUTH:
      dir = EAST
      break;
    case EAST:
      dir = NORTH
      break;
    case WEST:
      dir = SOUTH
      break;
  }
}

const turnRight = () => {
  switch (dir) {
    case NORTH:
      dir = EAST
      break;
    case SOUTH:
      dir = WEST
      break;
    case EAST:
      dir = SOUTH
      break;
    case WEST:
      dir = NORTH
      break;
  }
}

const forward  = (dist) => {
  switch (dir) {
    case NORTH:
      pos.y += dist
      break;
    case SOUTH:
      pos.y -= dist
      break;
    case EAST:
      pos.x += dist
      break;
    case WEST:
      pos.x -= dist
      break;
  }
}

module.exports = { solve }
