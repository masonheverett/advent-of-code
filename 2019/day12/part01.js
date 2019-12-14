const _ = require('lodash')

const solve = (data) => {
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
  });
  for (let i = 0; i < 1000; i++) {
    moons = calculateVelocities(moons)
    moons = applyVelocities(moons)
  }
  console.log(_.sum(totalEnergy(moons)))
}

const calculateVelocities = (moons) => {
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
  return moons
}

const applyVelocities = (moons) => {
  for (let i = 0; i < _.size(moons); i++) {
    moons[i].x += moons[i].dx
    moons[i].y += moons[i].dy
    moons[i].z += moons[i].dz
  }
  return moons
}

const potentialEnergy = (moon) => {
  return Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)
}

const kineticEnergy = (moon) => {
  return Math.abs(moon.dx) + Math.abs(moon.dy) + Math.abs(moon.dz)
}

const totalEnergy = (moons) => {
  let totalEnergy = []
  _.each(moons, (moon) => {
    totalEnergy.push(potentialEnergy(moon) * kineticEnergy(moon))
  })
  return totalEnergy
}

module.exports = { solve }
