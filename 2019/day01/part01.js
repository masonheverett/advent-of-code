const _ = require('lodash')

const solve = (data) => {
  let sum = 0;
  _.each(data, value => sum += requirements(parseInt(value, 10)));
  console.log(sum);
}

const requirements = (value) => {
  return Math.floor(value / 3) - 2
}

module.exports = { solve }
