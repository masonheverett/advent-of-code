import _ from 'lodash'

export const solve = (data) => {
  const parsed = parse(data)
  const errorRate = _.sumBy(parsed.values, (value) => {
    return isValid(value, parsed.ranges) ? 0 : value
  })
  console.log(errorRate)
}

const parse = (data) => {
  const ranges = []
  let lineNum = 0
  while (data[lineNum] !== '') {
    const sections = data[lineNum].split(' ').slice(-3)
    ranges.push(sections[0].split('-').map(Number))
    ranges.push(sections[2].split('-').map(Number))
    lineNum++
  }
  lineNum += 5
  const values = []
  while (lineNum < data.length) {
    values.push(...data[lineNum].split(',').map(Number))
    lineNum++
  }
  return { ranges, values }
}

const isValid = (value, ranges) => {
  return ranges.reduce((prev, curr) => {
    return prev || (value >= curr[0] && value <= curr[1])
  }, false)
}
