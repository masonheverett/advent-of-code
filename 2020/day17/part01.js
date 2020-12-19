const _ = require('lodash')

const activeCube = '#'

const solve = (data) => {
  const source = parse(data)
  _.times(6, () => {
    addSpace(source)
    boot(source)
  })
  console.log(activeCount(source))
}

const parse = (data) => {
  return [data.map((row) => row.split(''))]
}

const addSpace = (source) => {
  source.forEach((plane) => {
    plane.forEach((row) => {
      row.unshift('.')
      row.push('.')
    })
    const rowLength = plane.length + 2
    plane.unshift(_.times(rowLength, _.constant('.')))
    plane.push(_.times(rowLength, _.constant('.')))
  })
  const planeWidth = source[0][0].length
  const planeLength = source[0].length
  source.unshift(_.times(planeLength, () => _.times(planeWidth, _.constant('.'))))
  source.push(_.times(planeLength, () => _.times(planeWidth, _.constant('.'))))
}

const boot = (source) => {
  const oldSource = _.cloneDeep(source)
  oldSource.forEach((plane, z) => {
    plane.forEach((row, y) => {
      row.forEach((cube, x) => {
        const activeNeighborCount = activeNeighbors(oldSource, x, y, z)
        if (cube === '.') {
          source[z][y][x] = activeNeighborCount === 3 ? '#' : '.'
        } else {
          source[z][y][x] = [2, 3].includes(activeNeighborCount) ? '#' : '.'
        }
      })
    })
  })
}

const activeNeighbors = (source, x, y, z) => {
  let activeCount = 0
  const deltas = [-1, 0, 1]
  deltas.forEach((dz) => {
    deltas.forEach((dy) => {
      deltas.forEach((dx) => {
        if (dz === 0 && dy === 0 && dx === 0) return
        const nz = z + dz
        const ny = y + dy
        const nx = x + dx
        if (nz < 0 || ny < 0 || nx < 0) return
        if (nz >= source.length || ny >= source[0].length || nx >= source[0][0].length) return
        if (source[nz][ny][nx] === '#') activeCount++
      })
    })
  })
  return activeCount
}

const activeCount = (source) => {
  return _.sumBy(source, (plane) => {
    return _.sumBy(plane, (row) => {
      return _.sumBy(row, (cube) => cube === '#' ? 1 : 0)
    })
  })
}

const printSource = (source) => {
  source.forEach((plane) => {
    plane.forEach((row) => {
      console.log(row.join(''))
    })
    console.log('')
  })
}

module.exports = { solve }
