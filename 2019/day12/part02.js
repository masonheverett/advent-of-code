import _ from 'lodash'

export const solve = (data) => {
  let moons = []
  _.each(data, (moon) => {
    let xIndex = moon.indexOf('=') + 1
    let yIndex = moon.indexOf('=', xIndex) + 1
    let zIndex = moon.indexOf('=', yIndex) + 1
    moons.push({
      x: parseInt(moon.substring(xIndex, moon.indexOf(' ', xIndex)), 10),
      y: parseInt(moon.substring(yIndex, moon.indexOf(' ', yIndex)), 10),
      z: parseInt(moon.substring(zIndex, moon.indexOf('>', zIndex)), 10),
      dx: 0,
      dy: 0,
      dz: 0
    })
  })
  const cycleLengths = [null, null, null]
  let step = 1
  while (true) {
    simulate(moons)
    let xTotal = true
    let yTotal = true
    let zTotal = true
    moons.forEach((moon) => {
      xTotal = xTotal && moon.dx === 0
      yTotal = yTotal && moon.dy === 0
      zTotal = zTotal && moon.dz === 0
    })
    if (cycleLengths[0] === null && xTotal) cycleLengths[0] = step
    if (cycleLengths[1] === null && yTotal) cycleLengths[1] = step
    if (cycleLengths[2] === null && zTotal) cycleLengths[2] = step
    if (cycleLengths[0] !== null && cycleLengths[1] !== null && cycleLengths[2] !== null) break
    step++
  }
  console.log(2 * lcmArr(cycleLengths))
}

const lcmArr = (arr) => {
  return arr.reduce((previous, next) => {
    return lcm(previous, next)
  })
}

const gcd = (a, b) => {
  return !b ? a : gcd(b, a % b)
}

const lcm = (a, b) => {
  return Math.abs(a * b) / gcd(a, b)
}

const simulate = (moons) => {
  for (let index = 0; index < _.size(moons); index++) {
    for (let i = index + 1; i < _.size(moons); i++) {
      if (moons[index].x > moons[i].x) {
        moons[index].dx--
        moons[i].dx++
      } else if (moons[index].x < moons[i].x) {
        moons[index].dx++
        moons[i].dx--
      }
      if (moons[index].y > moons[i].y) {
        moons[index].dy--
        moons[i].dy++
      } else if (moons[index].y < moons[i].y) {
        moons[index].dy++
        moons[i].dy--
      }
      if (moons[index].z > moons[i].z) {
        moons[index].dz--
        moons[i].dz++
      } else if (moons[index].z < moons[i].z) {
        moons[index].dz++
        moons[i].dz--
      }
    }
  }
  for (let i = 0; i < _.size(moons); i++) {
    moons[i].x += moons[i].dx
    moons[i].y += moons[i].dy
    moons[i].z += moons[i].dz
  }
}
