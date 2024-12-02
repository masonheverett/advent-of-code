import _ from 'lodash'

export const solve = (data) => {
  let mask = ''
  let mem = []
  _.forEach(data, (inst) => {
    const parsed = inst.split(' = ')
    if (parsed[0] === 'mask') {
      mask = parsed[1]
    } else {
      const index = parsed[0].substring(0, parsed[0].length - 1).split('[')[1]
      let binary = parseInt(parsed[1]).toString(2)
      binary =  _.repeat('0', 36 - binary.length) + binary
      _.forEach(mask, (chr, i) => {
        if (chr === '1' || chr === '0') {
          binary = binary.substring(0, i) + chr + binary.substring(i + 1)
        }
      })
      mem[index] = parseInt(binary, 2)
    }
  })
  console.log(_.reduce(mem, (a, b = 0) => a + b, 0))
}
