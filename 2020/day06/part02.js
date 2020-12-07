const _ = require('lodash')

const solve = (data) => {
  groups = parse(data)
  var output = 0
  _.forEach(groups, (group) => {
    output += group.length
  })
  console.log(output)
}

const parse = (data) => {
  let groups = ['']
  let currentIndex = 0
  let groupSize = 0
  data.forEach((line) => {
    if (line === '') {
      groups.push('')
      currentIndex++
      groupSize = 0
    } else {
      if (groupSize === 0) {
        groups[currentIndex] = line
      } else {
        let answers = ''
        _.forEach(groups[currentIndex], (char) => {
          if (_.includes(line, char)) {
            answers = answers.concat(char)
          }
        })
        groups[currentIndex] = answers
      }
      groupSize++
    }
  })
  return groups
}

module.exports = { solve }
