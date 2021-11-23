import _ from 'lodash'
import intcode from '../shared/intcode.js'

export const solve = (data) => {
  const parsed = data[0].split(',').map(Number)
  let count = 0
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      let state = intcode({ data: _.cloneDeep(parsed) }, x)
      state = intcode(state, y)
      if (_.last(state.output) === 1) count++
    }
  }
  console.log(count)
}
