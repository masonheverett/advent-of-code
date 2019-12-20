const _ = require('lodash')
const os = require('os')
const runProgram = require('../../intcode.js').runProgram

const main = [65, 44, 66, 44, 65, 44, 66, 44, 67, 44, 65, 44, 67, 44, 65, 44, 67, 44, 66, 10]
const funA = [82, 44, 56, 44, 52, 44, 76, 44, 56, 44, 76, 44, 52, 44, 76, 44, 52, 10]
const funB = [76, 44, 56, 44, 82, 44, 54, 44, 76, 44, 54, 10]
// TODO: funC is too long!!!!!!!!!! See day17/scratch.txt
const funC = [76, 44, 56, 44, 76, 44, 52, 44, 82, 44, 56, 44, 52, 44, 76, 44, 54, 44, 76, 44, 52, 10]
const feed = [110, 10]
const input = main.concat(funA).concat(funB).concat(funC).concat(feed)

const solve = (data) => {
  const parsedData = data[0].split(',').map(Number)
  let state = { data: parsedData }
  input.forEach(value => {
    state = runProgram(state, value)
  })
  console.log(state.output.map(value => String.fromCharCode(value)).join(''))
}

module.exports = { solve }
