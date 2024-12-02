import _ from 'lodash'

export const solve = (data) => {
  let totalSum = 0
  _.forEach(data, (line) => {
    totalSum += calculateInputWithParenthesis(line)
    console.log('Total Sum ' + totalSum)
  }) 
  console.log('Final Sum ' + totalSum)
}

const calculateInput = (input) => {
  let tokens = input.split(' ')
  let offset = 0
  while(offset < tokens.length) {
    if (tokens[offset + 1] === '+') {
      tokens = tokens.slice(0, offset)
        .concat([eval(tokens.slice(offset, offset + 3).join(''))])
        .concat(tokens.slice(offset + 3))
    } else {
      offset += 2
    }
  }
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
  return calculateInput(input)
}
