import _ from 'lodash'

export const solve = (data) => {
  const lines = parseLines(data)
  const points = {}
  lines.forEach(line => {
    if (line[0][0] === line[1][0]) {
      const x = line[0][0]
      const min = _.min([line[0][1], line[1][1]])
      const max = _.max([line[0][1], line[1][1]])
      for (let y = min; y <= max; y++) {
        if (points[`${x},${y}`] === undefined) points[`${x},${y}`] = 1
        else points[`${x},${y}`]++
      }
    } else {
      const y = line[0][1]
      const min = _.min([line[0][0], line[1][0]])
      const max = _.max([line[0][0], line[1][0]])
      for (let x = min; x <= max; x++) {
        if (points[`${x},${y}`] === undefined) points[`${x},${y}`] = 1
        else points[`${x},${y}`]++
      }
    }
  })
  console.log(_.filter(_.entries(points), counter => counter[1] > 1).length)
}

const parseLines = (data) => {
  return data.map(line => {
    return line.split(' -> ').map(point => point.split(',').map(Number))
  }).filter(line => {
    return line[0][0] === line[1][0] || line[0][1] === line[1][1]
  })
}
