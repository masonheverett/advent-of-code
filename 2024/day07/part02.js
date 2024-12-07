import _ from 'lodash'

const OPERATOR_FNS = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => _.toNumber(a.toString() + b.toString())
]

export const solve = (data) => {
  // Process one at a time and count the good ones
  console.log(_.sum(data.map(line => {
    // Parse input
    const target = _.toNumber(line.split(':')[0])
    const operands = _.trim(line.split(':')[1]).split(' ').map(char => _.toNumber(char))
    // There are operands.length - 1 operator spots and numOperatorFns ^ numOperatorSpots potential combinations
    const operatorSpots = operands.length - 1
    const operatorCombos = Math.pow(OPERATOR_FNS.length, operatorSpots)
    // Loop through all potential combos
    for (let combo = 0; combo < operatorCombos; combo++) {
      // Determine the operators
      let operators = combo.toString(OPERATOR_FNS.length).split('').map(char => _.toNumber(char))
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
