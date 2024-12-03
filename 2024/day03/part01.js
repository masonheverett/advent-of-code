import _ from 'lodash'

export const solve = (data) => {
  const muls = data.join().match(/mul\(\d+,\d+\)/g)
  console.log(_.sum(muls.map(mul => {
    const parts = mul.match(/\d+/g)
    return _.toNumber(parts[0]) * _.toNumber(parts[1])
  })))
}
