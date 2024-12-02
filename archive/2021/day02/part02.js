import _ from 'lodash'

const FORWARD = 'forward'
const UP = 'up'
const DOWN = 'down'
const AIM = 'aim'

let pos = { x: 0, y: 0, aim: 0}

export const solve = (data) => {
  _.forEach(data, (inst) => {
    const commands = inst.split(' ')
    const dist = parseInt(commands[1])
    switch (commands[0]) {
      case FORWARD:
        pos.x += dist
        pos.y += (pos.aim * dist)
        break
      case UP:
        pos.aim -= dist
        break
      case DOWN:
        pos.aim += dist
        break
    }
  })
  console.log(pos)
  const multipliedDistances = Math.abs(pos.x) * Math.abs(pos.y)
  console.log(multipliedDistances)
}