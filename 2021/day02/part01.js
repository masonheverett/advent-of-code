import _ from 'lodash'

const FORWARD = 'forward'
const UP = 'up'
const DOWN = 'down'

let pos = { x: 0, y: 0 }

export const solve = (data) => {
  _.forEach(data, (inst) => {
    const commands = inst.split(' ')
    const dist = parseInt(commands[1])
    switch (commands[0]) {
      case FORWARD:
        pos.x += dist
        break
      case UP:
        pos.y -= dist
        break
      case DOWN:
        pos.y +=dist
        break
    }
  })
  console.log(pos)
  const multipliedDistances = Math.abs(pos.x) * Math.abs(pos.y)
  console.log(multipliedDistances)
}