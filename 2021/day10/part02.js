import _ from 'lodash'

export const solve = (data) => {
  const incompleteLineStacks = []
  data.forEach(line => {
    const lineArr = line.split('')
    const openBraces = []
    for (let i = 0; i < lineArr.length; i++) {
      const brace = lineArr[i]
      if (isOpenBrace(brace)) {
        openBraces.push(brace)
      } else {
        if (_.last(openBraces) === matchingBrace(brace)) openBraces.pop()
        else return
      }
    }
    incompleteLineStacks.push(openBraces)
  })
  console.log(_.sortBy(incompleteLineStacks.map(completionStringScore))[(incompleteLineStacks.length - 1) / 2])
}

const isOpenBrace = (brace) => {
  return brace === '(' || brace === '[' || brace === '{' || brace === '<'
}

const matchingBrace = (brace) => {
  return {
    '(': ')',
    ')': '(',
    '[': ']',
    ']': '[',
    '{': '}',
    '}': '{',
    '<': '>',
    '>': '<',
  }[brace]
}

const braceScore = (brace) => {
  return {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }[brace]
}

const completionStringScore = (openBraces) => {
  return _.reverse(openBraces)
    .map(matchingBrace)
    .reduce((total, nextBrace) => {
      return total * 5 + braceScore(nextBrace)
    }, 0)
}
