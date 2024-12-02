import _ from 'lodash'

export const solve = (data) => {
  const leftList = []
  const rightCounts = {}
  data.forEach(line => {
    const numbers = _.split(line, '   ')
    leftList.push(numbers[0])
    rightCounts[numbers[1]] ? rightCounts[numbers[1]]++ : rightCounts[numbers[1]] = 1
  })
  console.log(_.sum(leftList.map(char => _.toNumber(char) * (rightCounts[char] ? rightCounts[char] : 0))))
}
