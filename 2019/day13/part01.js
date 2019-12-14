const _ = require('lodash')
const runProgram = require('../../intcode.js').runProgram

const solve = (data) => {
  let count = 0
  const parsedData = data[0].split(',').map(Number)
  const { output } = runProgram({ data: parsedData })
  for (let i = 2; i < output.length; i += 3) {
    if (output[i] === 2) count++
  }
  console.log(count)
}

module.exports = { solve }
