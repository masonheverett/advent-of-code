import _ from 'lodash'

export const solve = (data) => {
  let enabled = true
  const muls = data.join().match(/(mul\(\d+,\d+\))|(do(n't)?\(\))/g)
  console.log(_.sum(muls.map(mul => {
    if (mul === 'do()') {
      enabled = true
      return 0
    }
    if (mul === "don't()") {
      enabled = false
      return 0
    }
    if (enabled) {
      const parts = mul.match(/\d+/g)
      return _.toNumber(parts[0]) * _.toNumber(parts[1])
    }
    return 0
  })))
}
