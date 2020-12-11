const _ = require('lodash')

const emptySeat = 'L'
const occupiedSeat = '#'
const directions = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: -1, y: -1 }
]

const solve = (data) => {
  let changed = true
  let processedSeating = []
  while (changed) {
    processedSeating = processSeating(data)
    data = processedSeating[0]
    changed = processedSeating[1]
  }

  var occupiedCount = _.sumBy(data.join(''), ch => ch === occupiedSeat)
  console.log('Occupied Count: ' + occupiedCount)
}

const processSeating = (data) => {
  var tempSeats = []
  changed = false
  _.forEach(data, (row, y) => {
    var tempRow  = '';
    _.forEach(row, (seat, x) => {
      let occupiedCount = 0
      _.forEach(directions, ({x: dx, y: dy}) => {
        let tempX = x + dx;
        let tempY = y + dy;
        while (tempX >= 0 && tempY >= 0 && tempX < data[0].length && tempY < data.length) {
          if (data[tempY][tempX] === occupiedSeat) {
            occupiedCount++
            break;
          }
          if (data[tempY][tempX] === emptySeat) break;
          tempX += dx
          tempY += dy
        }
      })
      if (seat === emptySeat && occupiedCount === 0) {
        tempRow += occupiedSeat
        changed = true
      } else if (seat === occupiedSeat && occupiedCount >= 5) {
        tempRow += emptySeat
        changed = true
      } else {
        tempRow += seat
      }
    })
    tempSeats.push(tempRow)
  })
  return [tempSeats, changed]
}

module.exports = { solve }
