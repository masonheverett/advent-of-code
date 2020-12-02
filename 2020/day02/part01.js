const _ = require('lodash')

const solve = (data) => {
  var count = 0
  _.forEach(data, (line) => {
    const inst = _.split(line, ' ')
    const range = _.split(inst[0], '-')
    const chr = inst[1][0]
    const min = _.parseInt(range[0])
    const max = _.parseInt(range[1])
    const str = inst[2]
    const occs = _.sumBy(str, x => x === chr)
    if (occs >= min && occs <= max)
    {
      count++
    }
  })
  console.log(count)
}

module.exports = { solve }
