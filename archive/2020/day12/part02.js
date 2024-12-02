import _ from 'lodash'

const NORTH = 'N'
const SOUTH = 'S'
const EAST = 'E'
const WEST = 'W'
const LEFT = 'L'
const RIGHT = 'R'
const FORWARD = 'F'
let pos = { x: 0, y: 0 }
let waypoint = { x: 10, y: 1 }

export const solve = (data) => {

  _.forEach(data, (inst) => {
    const dist = parseInt(inst.substring(1))
    switch (inst[0]) {
      case NORTH:
        waypoint.y += dist
        break;
      case SOUTH:
        waypoint.y -= dist
        break;
      case EAST:
        waypoint.x += dist
        break;
      case WEST:
        waypoint.x -= dist
        break;
      case LEFT:
        turnLeft(dist)
        break;
      case RIGHT:
        turnRight(dist)
        break;
      case FORWARD:
        forward(dist)
        break;
    }
  })
  const manhattanDistance = Math.abs(pos.x) + Math.abs(pos.y)
  console.log(manhattanDistance)
}

const turnLeft = (dist) => {
  for (i = 0; i < dist; i += 90) {
    waypoint = { x: -waypoint.y, y: waypoint.x }
  }
}

const turnRight = (dist) => {
  for (i = 0; i < dist; i += 90) {
    waypoint = { x: waypoint.y, y: -waypoint.x }
  }
}

const forward = (dist) => {
  for (i = 0; i < dist; i++) {
    pos.x += waypoint.x
    pos.y += waypoint.y
  }
}
