import _ from 'lodash'

export const solve = (data) => {
  const leftList = []
  const rightCounts = {}
  data.forEach(line => {
    const numbers = _.split(line, '   ')
    // Create first list
    leftList.push(numbers[0])
    // Create count of instances in right list
    rightCounts[numbers[1]] ? rightCounts[numbers[1]]++ : rightCounts[numbers[1]] = 1
  })
  // Multiply each number in left list by number of occurences in right list and sum those up
  console.log(_.sum(leftList.map(char => _.toNumber(char) * (rightCounts[char] ? rightCounts[char] : 0))))
}
