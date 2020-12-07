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
  data.forEach((line) => {
    if (line === '') {
      groups.push('')
      currentIndex++
    } else {
      _.forEach(line, (char) => {
        if (!_.includes(groups[currentIndex], char)) {
          groups[currentIndex] = groups[currentIndex].concat(char)
        }
      })
    }
  })
  return groups
}

module.exports = { solve }
