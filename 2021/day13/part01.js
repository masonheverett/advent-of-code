import _ from 'lodash'

export const solve = (data) => {
  let points = _.takeWhile(data, line => line.length > 0)
    .map(line => line.split(',').map(Number))
  const folds = _.slice(data, points.length + 1)
    .map(line => line.slice(11).split('='))
    .map(line => [line[0], Number(line[1])])
  const fold = folds[0]
  if (fold[0] === 'x') {
    for (let i = 0; i < points.length; i++) {
      if (points[i][0] > fold[1]) {
        points[i][0] -= (2 * (points[i][0] - fold[1]))
      }
    }
  } else {
    for (let i = 0; i < points.length; i++) {
      if (points[i][1] > fold[1]) {
        points[i][1] -= (2 * (points[i][1] - fold[1]))
      }
    }
  }
  points = _.uniqBy(points, point => `${point[0]},${point[1]}`)
  console.log(points.length)
}
