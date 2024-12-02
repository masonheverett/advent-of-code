import _ from 'lodash'

export const solve = (data) => {
  const wire1 = getPoints(data[0].split(','))
  const wire2 = getPoints(data[1].split(','))
  const intersections = _.intersectionWith(wire1, wire2, arePointsEqual)
  const distances = intersections.map(intersection => combinedDistance(intersection, wire1, wire2))
  console.log(_.min(distances))
}

const combinedDistance = (point, wire1, wire2) => {
  return _.findIndex(wire1, p => arePointsEqual(point, p))
    + _.findIndex(wire2, p => arePointsEqual(point, p))
    + 2
}

const getPoints = (commands) => {
  const wire = []
  let currPoint = [0, 0]
  commands.forEach(command => {
    const direction = command[0]
    const length = Number(command.substring(1))
    const moverFunc = getMoverFunc(direction)
    for (let i = 0; i < length; i++) {
      currPoint = moverFunc(currPoint)
      wire.push(currPoint)
    }
  })
  return _.uniq(wire)
}

const getMoverFunc = (direction) => {
  switch(direction) {
    case 'R':
      return (point) => ([point[0] + 1, point[1]])
    case 'L':
      return (point) => ([point[0] - 1, point[1]])
    case 'U':
      return (point) => ([point[0], point[1] + 1])
    case 'D':
      return (point) => ([point[0], point[1] - 1])
  }
}

const arePointsEqual = (a, b) => a[0] === b[0] && a[1] === b[1]