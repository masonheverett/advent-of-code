const _ = require('lodash')

const solve = (data) => {
  const source = parse(data)
  _.times(6, () => {
    addSpace(source)
    boot(source)
  })
  console.log(activeCount(source))
}

const parse = (data) => {
  return [[data.map((row) => row.split(''))]]
}

const addSpace = (source) => {
  source.forEach((box) => {
    box.forEach((plane) => {
      plane.forEach((row) => {
        row.unshift('.')
        row.push('.')
      })
      const rowLength = plane.length + 2
      plane.unshift(_.times(rowLength, _.constant('.')))
      plane.push(_.times(rowLength, _.constant('.')))
    })
    const planeWidth = box[0][0].length
    const planeLength = box[0].length
    box.unshift(_.times(planeLength, () => _.times(planeWidth, _.constant('.'))))
    box.push(_.times(planeLength, () => _.times(planeWidth, _.constant('.'))))
  })
  const boxWidth = source[0][0][0].length
  const boxHeight = source[0][0].length
  const boxDepth = source[0].length
  source.unshift(_.times(boxDepth, () => _.times(boxHeight, () => _.times(boxWidth, _.constant('.')))))
  source.push(_.times(boxDepth, () => _.times(boxHeight, () => _.times(boxWidth, _.constant('.')))))
}

const boot = (source) => {
  const oldSource = _.cloneDeep(source)
  oldSource.forEach((box, w) => {
    box.forEach((plane, z) => {
      plane.forEach((row, y) => {
        row.forEach((cube, x) => {
          const activeNeighborCount = activeNeighbors(oldSource, x, y, z, w)
          if (cube === '.') {
            source[w][z][y][x] = activeNeighborCount === 3 ? '#' : '.'
          } else {
            source[w][z][y][x] = [2, 3].includes(activeNeighborCount) ? '#' : '.'
          }
        })
      })
    })
  })
}

const activeNeighbors = (source, x, y, z, w) => {
  let activeCount = 0
  const deltas = [-1, 0, 1]
  deltas.forEach((dw) => {
    deltas.forEach((dz) => {
      deltas.forEach((dy) => {
        deltas.forEach((dx) => {
          if (dw === 0 && dz === 0 && dy === 0 && dx === 0) return
          const nw = w + dw
          const nz = z + dz
          const ny = y + dy
          const nx = x + dx
          if (nw < 0 || nz < 0 || ny < 0 || nx < 0) return
          if (nw >= source.length || nz >= source[0].length) return
          if (ny >= source[0][0].length || nx >= source[0][0][0].length) return
          if (source[nw][nz][ny][nx] === '#') activeCount++
        })
      })
    })
  })
  return activeCount
}

const activeCount = (source) => {
  return _.sumBy(source, (box) => {
    return _.sumBy(box, (plane) => {
      return _.sumBy(plane, (row) => {
        return _.sumBy(row, (cube) => cube === '#' ? 1 : 0)
      })
    })
  })
}

const printBox = (box) => {
  box.forEach((plane) => {
    plane.forEach((row) => {
      console.log(row.join(''))
    })
    console.log('')
  })
}

module.exports = { solve }
