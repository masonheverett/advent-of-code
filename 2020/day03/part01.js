const _ = require('lodash')

const solve = (data) => {
  var count = 0
  const width = data[0].length
  for (i = 1; i < data.length; i++) {
    const x = (3 * i) % width
    if (data[i][x] === '#')
      count++;
  }
  console.log(count)
}

module.exports = { solve }
