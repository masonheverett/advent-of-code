const _ = require('lodash')

const solve = (data) => {
  var maxId = 0
  _.forEach(data, (pass) => {
    const seatId = readPass(pass)
    if (seatId > maxId)
      maxId = seatId
  })
  console.log(maxId)
}

const readPass = (pass) => {
  const rows = _.range(0, 128)
  const rowFinder = pass.substring(0, 7)
  const row = binarySearch(rows, rowFinder)

  const seats = _.range(0, 8)
  const seatFinder = pass.substring(7)
  const seat = binarySearch(seats, seatFinder)

  const seatId = (row * 8) + seat
  return seatId
}

const binarySearch = (arr, finder) => {
  if (finder.length === 0) {
    return arr[0]
  } else if (finder[0] === 'F' || finder[0] === 'L') {
    return binarySearch(arr.splice(0, _.ceil(arr.length / 2)), finder.substring(1));
  } else {
    return binarySearch(arr.splice(-_.ceil(arr.length / 2)), finder.substring(1));
  }
}

module.exports = { solve }
