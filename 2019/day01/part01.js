const _ = require('lodash')

const solve = (data) => {
  let sum = 0;
  _.each(data, value => sum += Math.floor((parseInt(value, 10) / 3)) - 2);
  console.log(sum);
}

module.exports = { solve }
