import _ from 'lodash'

export const solve = (data) => {
  const leftList = []
  const rightList = []
  // Parse input into 2 lists
  data.forEach(line => {
    const numbers = _.split(line, '   ')
    leftList.push(_.toNumber(numbers[0]))
    rightList.push(_.toNumber(numbers[1]))
  })
  // Sort the lists
  leftList.sort()
  rightList.sort()
  // Sum the diffs
  console.log(_.sum(leftList.map((_, ndx) => {
    return Math.abs(leftList[ndx] - rightList[ndx])
  })))
}
