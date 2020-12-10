const _ = require('lodash')

const solve = (data) => {
  const adapters = parse(data)
  console.log(arrangements(adapters, 1))
}

const arrangements = (data, start) => {
  let count = 1
  for (let i = start; i < data.length - 1; i++) {
    if (canRemove(data, i)) {
      count += arrangements(_.without(data, data[i]), i)
    }
  }
  return count
}

const canRemove = (data, i) => {
  return data[i + 1] - data[i - 1] < 4
}

const parse = (data) => {
  const sorted = data.map((num) => parseInt(num)).sort((a, b) => a - b)
  sorted.unshift(0)
  return sorted
}

module.exports = { solve }
