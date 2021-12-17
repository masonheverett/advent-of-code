import _ from 'lodash'

export const solve = (data) => {
  console.log(_.sum(
    data.map(line => line.split('x').map(Number)).map(paperNeeded)
  ))
}

const paperNeeded = ([length, width, height]) => {
  return 2 * length * width + 2 * width * height + 2 * height * length + smallestSideArea(length, width, height)
}

const smallestSideArea = (length, width, height) => {
  return _.min([
    length * width,
    length * height,
    width * height
  ])
}
