import _ from 'lodash'

export const solve = (data) => {
  console.log(_.sum(
    data.map(line => line.split('x').map(Number)).map(ribbonNeeded)
  ))
}

const ribbonNeeded = ([length, width, height]) => {
  return smallestSidePerimeter(length, width, height) + (length * width * height)
}

const smallestSidePerimeter = (length, width, height) => {
  return 2 * _.min([
    length + width,
    length + height,
    width + height
  ])
}
