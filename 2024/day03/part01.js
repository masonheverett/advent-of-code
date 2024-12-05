import _ from 'lodash'

export const solve = (data) => {
  // Find instructions
  console.log(_.sum(data.join().match(/mul\(\d+,\d+\)/g).map(mul => {
    // Parse instructions 
    const parts = mul.match(/\d+/g)
    // Execute instructions
    return _.toNumber(parts[0]) * _.toNumber(parts[1])
  })))
}
