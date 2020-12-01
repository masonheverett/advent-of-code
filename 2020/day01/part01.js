const _ = require('lodash')

const solve = (data) => {
  data.some((item1, index1) => {
    return data.some((item2, index2) => {
      const num1 = Number(item1)
      const num2 = Number(item2)
      if (index1 != index2 && num1 + num2 == 2020) {
        console.log(num1 * num2)
        return true
      }
    })
  })
}

module.exports = { solve }
