import _ from 'lodash'

export const solve = (data) => {
  const instructions = parseData(data)
  const core = new Set()
  instructions.forEach(instruction => {
    for (let x = _.max([-50, instruction.cuboid.x.min]); x <= _.min([50, instruction.cuboid.x.max]); x++) {
      for (let y = _.max([-50, instruction.cuboid.y.min]); y <= _.min([50, instruction.cuboid.y.max]); y++) {
        for (let z = _.max([-50, instruction.cuboid.z.min]); z <= _.min([50, instruction.cuboid.z.max]); z++) {
          if (instruction.onOff === 1) core.add(`${x},${y},${z}`)
          else core.delete(`${x},${y},${z}`)
        }
      }
    }
  })
  console.log(core.size)
}

const parseData = (data) => {
  return data.map(line => {
    const [onOff, cuboidString] = line.split(' ')
    const cuboid = cuboidString.split(',').map(axisRange => axisRange.substring(2).split('..').map(Number))
    return {
      onOff: (onOff === 'on' ? 1 : 0),
      cuboid: {
        x: { min: _.min(cuboid[0]), max: _.max(cuboid[0]) },
        y: { min: _.min(cuboid[1]), max: _.max(cuboid[1]) },
        z: { min: _.min(cuboid[2]), max: _.max(cuboid[2]) }
      }
    }
  })
}
