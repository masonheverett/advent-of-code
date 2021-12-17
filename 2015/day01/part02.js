import _ from 'lodash'

export const solve = (data) => {
  let floor = 0
  for (let i = 0; i < data[0].length; i++) {
    if (data[0].charAt(i) === '(') floor++
    else floor--
    if (floor < 0) {
      console.log(i + 1)
      break
    }
  }
}
