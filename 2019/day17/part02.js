const _ = require('lodash')
const os = require('os')
const runProgram = require('../../intcode.js').runProgram

const main = 'A,B,A,B,C,A,C,A,C,B\n'
const funA = 'R,12,L,8,L,4,L,4\n'
const funB = 'L,8,R,6,L,6\n'
const funC = 'L,8,L,4,R,12,L,6,L,4\n'
const feed = 'n\n'
const inputStr = main + funA + funB + funC + feed
const input = inputStr.split('').map(val => val.charCodeAt(0))

const solve = (data) => {
  const parsedData = data[0].split(',').map(Number)
  let state = { data: parsedData }
  input.forEach(value => {
    state = runProgram(state, value)
  })
  console.log(state.output.slice(0,-1).map(value => String.fromCharCode(value)).join(''))
  console.log(state.output.slice(-1)[0])
}

module.exports = { solve }
