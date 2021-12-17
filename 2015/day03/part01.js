import _ from 'lodash'

export const solve = (data) => {
  const directions = data[0].split('')
  const santa = { x: 0, y: 0 }
  const delivered = { '0,0': 1 }
  for (let i = 0; i < directions.length; i++) {
    switch(directions[i]) {
      case '^':
        santa.y++
        break
      case '>':
        santa.x++
        break
      case 'v':
        santa.y--
        break
      case '<':
        santa.x--
        break
    }
    if (delivered[`${santa.x},${santa.y}`] === undefined) delivered[`${santa.x},${santa.y}`] = 1
    else delivered[`${santa.x},${santa.y}`]++
  }
  console.log(_.size(delivered))
}
