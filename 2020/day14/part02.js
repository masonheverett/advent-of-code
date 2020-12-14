const _ = require('lodash')

const solve = (data) => {
  let mask = ''
  let mem = []
  let allIndeces = []
  let sum = 0
  
  _.forEach(data, (inst) => {
    const parsed = inst.split(' = ')
    if (parsed[0] === 'mask') {
      mask = parsed[1]
    } else {
      let index = parseInt(parsed[0].substring(0, parsed[0].length - 1).split('[')[1]).toString(2)
      index =  _.repeat('0', 36 - index.length) + index
      _.forEach(mask, (chr, i) => {
        if (chr === '1' || chr === 'X') {
          index = index.substring(0, i) + chr + index.substring(i + 1)
        }
      })
      const chunks = index.split('X')

      let indeces = _.reduce(chunks, (acc, chunk) => {
        if (acc.length === 0) return [chunk]
        const ones = [...acc].map(x => x + '0' + chunk)
        const zeroes = [...acc].map(x => x + '1' + chunk)
        return [...ones, ...zeroes]
      }, [])
      _.forEach(indeces, (i) => {
        const newIndex = parseInt(i, 2)
        if (!_.includes(allIndeces, newIndex)) allIndeces.push(newIndex)
        mem[parseInt(i, 2)] = parseInt(parsed[1])
      })
    }
  })

  _.forEach(allIndeces, (ind) => {
    const value = mem[ind]
    if (value != null && value != 0) sum += value
  })
  console.log(sum)
}

module.exports = { solve }
