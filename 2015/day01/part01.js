import _ from 'lodash'

export const solve = (data) => {
  console.log(data[0].split('').reduce((floor, next) => {
    return next === '(' ? floor + 1 : floor - 1
  }, 0))
}
