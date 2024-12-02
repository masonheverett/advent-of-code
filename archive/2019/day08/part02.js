import _ from 'lodash'

const IMG_WIDTH = 25
const IMG_HEIGHT = 6

export const solve = (data) => {
  const layers = _.chunk(data[0], IMG_WIDTH * IMG_HEIGHT)
  const finalImage = []
  for (let i = 0; i < IMG_WIDTH * IMG_HEIGHT; i++) {
    finalImage.push(getColor(layers, i))
  }
  outputImage(finalImage)
}

const getColor = (layers, ndx) => {
  for (let i = 0; i < layers.length; i++) {
    if (layers[i][ndx] !== '2') {
      return makeReadable(layers[i][ndx])
    }
  }
}

const makeReadable = (value) => {
  switch (value) {
    case '0':
      return '  '
    case '1':
      return '@@'
  }
}

const outputImage = (image) => {
  _.chunk(image, IMG_WIDTH).map(row => row.join('')).forEach(row => console.log(row))
}
