import _ from 'lodash'

export const solve = (data) => {
  var count = 0
  _.forEach(data, (line) => {
    const inst = _.split(line, ' ')
    const locs = _.split(inst[0], '-')
    const chr = inst[1][0]
    const x = _.parseInt(locs[0]) - 1
    const y = _.parseInt(locs[1]) - 1
    const str = inst[2]
    if ((str[x] === chr && str[y] !== chr) || (str[x] !== chr && str[y] === chr))
    {
      count++
    }
  })
  console.log(count)
}
