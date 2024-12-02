import _ from 'lodash'

export const solve = (data) => {
  data.some((item1, index1) => {
    return data.some((item2, index2) => {
      return data.some((item3, index3) => {
        const num1 = Number(item1)
        const num2 = Number(item2)
        const num3 = Number(item3)
        if (index1 != index2 && index1 != index3 && num1 + num2 + num3 == 2020) {
          console.log(num1 * num2 * num3)
          return true
        }
      })
    })
  })
}
