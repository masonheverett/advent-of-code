import _ from 'lodash'

export const solve = (data) => {
  var totalSum = 0;
  _.forEach(data, (line) => {
    totalSum += calculateInputWithParenthesis(line)
    console.log('Total Sum ' + totalSum)
  }) 
  console.log('Final Sum ' + totalSum)
}

const calculateInput = (input) => {
  var tokens = input.split(' ')
  while(tokens.length > 1) {
    tokens = [eval(tokens.slice(0,3).join(''))].concat(tokens.slice(3))
  }
  return tokens[0]
}

const calculateInputWithParenthesis = (input) => {
  while(/\(/.test(input)) {
    input = input.replace(/\(([^()]+)\)/g, (match, matched) => {
      return calculateInput(matched)
    })
  }
  return calculateInput(input);
}
