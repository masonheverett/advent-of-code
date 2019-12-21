const _ = require('lodash')
const runProgram = require('../../intcode.js').runProgram

const solve = (data) => {
  const parsed = data[0].split(',').map(Number)
  let count = 0
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      let state = runProgram({ data: _.cloneDeep(parsed) }, x)
      state = runProgram(state, y)
      if (_.last(state.output) === 1) count++
    }
  }
  console.log(count)
}

module.exports = { solve }
