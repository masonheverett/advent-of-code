import _ from 'lodash'

export const solve = (data) => {
  let map = parseData(data)
  let prev = []
  let steps = 0
  while (!_.isEqual(map, prev)) {
    prev = _.cloneDeep(map)    
    map = moveEast(map)
    map = moveSouth(map)
    steps++
  }
  console.log('Finished after ' + steps + ' steps')
}

const parseData = (data) => {
  let map = []
  _.forEach(data, row => {
    map.push(_.split(row, ''))
  })
  return map
}

const moveEast = (map) => {
  const temp = _.cloneDeep(map)
  for (let y=0; y<temp.length; y++) {
    for (let x=0; x<temp[0].length; x++) {
      if (temp[y][x] === '>') {
        if (x < temp[y].length-1) {
          if (temp[y][x+1] === '.') {
            map[y][x] = '.'
            map[y][x+1] = '>'
          }
        } else if (temp[y][0] === '.') {
          map[y][x] = '.'
          map[y][0] = '>'
        }
      }
    }
  }
  return map
}

const moveSouth = (map) => {
  const temp = _.cloneDeep(map)
  for (let x=0; x<temp[0].length; x++) {
    for (let y=0; y<temp.length; y++) {
      if (temp[y][x] === 'v') {
        if (y < temp.length-1) {
          if (temp[y+1][x] === '.') {
            map[y][x] = '.'
            map[y+1][x] = 'v'
          }
        } else if (temp[0][x] === '.') {
          map[y][x] = '.'
          map[0][x] = 'v'
        }
      }
    }
  }
  return map
}
