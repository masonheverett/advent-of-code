import _ from 'lodash'

export const solve = (data) => {
  let sum = 0
  _.each(data, value => sum += requirements(parseInt(value, 10)))
  console.log(sum)
}

const requirements = (value) => {
  if (Math.floor(value / 3) - 2 >= 0) {
    return (Math.floor(value / 3) - 2) + requirements(Math.floor(value / 3) - 2)
  }
  return 0
}
