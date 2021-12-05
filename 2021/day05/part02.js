import _ from 'lodash'

export const solve = (data) => {
  const lines = parseLines(data)
  console.log(lines);
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
    } 
    else if(line[0][1] === line[1][1]) {
      const y = line[0][1]
      const min = _.min([line[0][0], line[1][0]])
      const max = _.max([line[0][0], line[1][0]])
      for (let x = min; x <= max; x++) {
        if (points[`${x},${y}`] === undefined) points[`${x},${y}`] = 1
        else points[`${x},${y}`]++
      }
    }
    else {
      const xmin = _.min([line[0][0], line[1][0]])
      const xmax = _.max([line[0][0], line[1][0]])
      const ymin = _.min([line[0][1], line[1][1]])
      const ymax = _.max([line[0][1], line[1][1]])
      
      if(line[0][0] == xmin && line[0][1] == ymin) {
        for (let x=xmin, y=ymin; x<=xmax; x++,y++) {
          addPoints(points, x, y)
        }
      }
      else if(line[0][0] == xmin && line[0][1] == ymax) {
        for (let x=xmin, y=ymax; x<=xmax; x++,y--) {
          addPoints(points, x, y)
        }
      }
      else if(line[0][0] == xmax && line[0][1] == ymin) {
        for (let x=xmax, y=ymin; x>=xmin; x--,y++) {
          addPoints(points, x, y)
        }
      }
      else {
        for (let x=xmax, y=ymax; x>=xmin; x--,y--) {
          addPoints(points, x, y)
        }
      }
    }
  })
  console.log(_.filter(_.entries(points), counter => counter[1] > 1).length)
}

const parseLines = (data) => {
  return data.map(line => {
    return line.split(' -> ').map(point => point.split(',').map(Number))
  })
}

const addPoints = (points, x, y) => {
  if (points[`${x},${y}`] === undefined) points[`${x},${y}`] = 1
  else points[`${x},${y}`]++
}
