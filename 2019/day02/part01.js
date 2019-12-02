const _ = require('lodash')

const solve = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i] = parseInt(data[i], 10)
  }
  for (let i = 0; i < data.length; i += 4) {
    switch (data[i]) {
      case 1:
        data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]]
        break;
      case 2:
        data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]]
        break;
      case 99:
        i = data.length
        break;
      default:
        break;
    }
  }
  console.log(data)
}

module.exports = { solve }
