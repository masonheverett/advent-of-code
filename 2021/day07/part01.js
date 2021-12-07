import _ from 'lodash'

export const solve = (data) => {
  const positions = data[0].split(',').map(Number)
  const min = _.min(positions)
  const max = _.max(positions)
  let leastCost
  for (let i = min; i <= max; i++) {
    let cost = 0
    for (let j = 0; j < positions.length; j++) {
      cost += Math.abs(i - positions[j])
    }
    if (i === 0 || cost < leastCost) {
      leastCost = cost
    }
  }
  console.log(leastCost)
}
