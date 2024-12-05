import _ from 'lodash'

export const solve = (data) => {
  // Default to enabled
  let enabled = true
  // Find instructions
  console.log(_.sum(data.join().match(/(mul\(\d+,\d+\))|(do(n't)?\(\))/g).map(mul => {
    // Enable
    if (mul === 'do()') {
      enabled = true
      return 0
    }
    // Disable
    if (mul === "don't()") {
      enabled = false
      return 0
    }
    // Multiply
    if (enabled) {
      const parts = mul.match(/\d+/g)
      return _.toNumber(parts[0]) * _.toNumber(parts[1])
    }
    return 0
  })))
}
