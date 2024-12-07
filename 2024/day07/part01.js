import _ from 'lodash'

const OPERATOR_FNS = [
  (a, b) => a + b,
  (a, b) => a * b
]

export const solve = (data) => {
  // Process one at a time and count the good ones
  console.log(_.sum(data.map(line => {
    // Parse input
    const target = _.toNumber(line.split(':')[0])
    const operands = _.trim(line.split(':')[1]).split(' ').map(char => _.toNumber(char))
    // There are operands.length - 1 operator spots and 2 ^ numOperatorSpots potential combinations
    const operatorSpots = operands.length - 1
    const operatorCombos = Math.pow(2, operatorSpots)
    // Loop through all potential combos
    for (let combo = 0; combo < operatorCombos; combo++) {
      // Determine the operators
      let operators = combo.toString(2).split('').map(char => _.toNumber(char))
      while (operators.length < operatorSpots) operators.unshift(0)
      // Calculate the result
      const result = operands.reduce((result, operand, ndx) => {
        return OPERATOR_FNS[operators[ndx-1]](result, operand)
      })
      if (result === target) return result
    }
    return 0
  })))
}
