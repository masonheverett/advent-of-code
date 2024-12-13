import _ from 'lodash'

const MAX_PUSHES = 100

export const solve = (data) => {
  let total = 0
  _.chunk(data, 4).forEach(chunk => {
    // Parse input
    const ax = _.toNumber(chunk[0].match(/X\+\d+/)[0].substring(2))
    const ay = _.toNumber(chunk[0].match(/Y\+\d+/)[0].substring(2))
    const bx = _.toNumber(chunk[1].match(/X\+\d+/)[0].substring(2))
    const by = _.toNumber(chunk[1].match(/Y\+\d+/)[0].substring(2))
    const px = _.toNumber(chunk[2].match(/X=\d+/)[0].substring(2))
    const py = _.toNumber(chunk[2].match(/Y=\d+/)[0].substring(2))
    // Loop through possibilities for Button A
    let cheapest = Number.POSITIVE_INFINITY
    for (let a = 0; a <= MAX_PUSHES; a++) {
      // Start with X axis
      const b = (px - (ax * a)) / bx
      // If B is over 100, skip
      if (b > 100) continue
      // If B is less than 0, stop
      if (b < 0) break
      // If B is not a whole number, skip
      if (!_.isInteger(b)) continue
      // Check Y axis
      if (ay * a + by * b === py) {
        const cost = 3 * a + b
        // Check if cheapest so far
        if (cost < cheapest) cheapest = cost
      }
    }
    // If there is a valid path, add it to the total
    if (cheapest < Number.POSITIVE_INFINITY) total += cheapest
  })
  console.log(total)
}
