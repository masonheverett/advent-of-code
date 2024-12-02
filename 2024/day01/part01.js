import _ from 'lodash'

export const solve = (data) => {
  const leftList = []
  const rightList = []
  data.forEach(line => {
    const numbers = _.split(line, '   ')
    leftList.push(_.toNumber(numbers[0]))
    rightList.push(_.toNumber(numbers[1]))
  })
  leftList.sort()
  rightList.sort()
  console.log(_.sum(leftList.map((_, ndx) => {
    return Math.abs(leftList[ndx] - rightList[ndx])
  })))
}
