import _ from 'lodash'

const IMG_WIDTH = 25
const IMG_HEIGHT = 6

export const solve = (data) => {
  const layers = _.chunk(data[0], IMG_WIDTH * IMG_HEIGHT)
  const mostZeroes = _.minBy(layers, layer => _.countBy(layer)['0'])
  console.log(_.countBy(mostZeroes)['1'] * _.countBy(mostZeroes)['2'])
}
