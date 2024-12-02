import _ from 'lodash'

export const solve = (data) => {
  data = data.map((v) => v.split(''))

  let totalAsteroids = 0
  data.forEach((v, y1) => v.forEach((v, x1) => {
    if (data[y1][x1] === '#') totalAsteroids += 1
  }))

  let max = 0
  let topx = 0
  let topy = 0
  let bestShots = []

  data.forEach((v, y1) => v.forEach((v, x1) => {
    let count = { asteroids: totalAsteroids - 1 }
    let dataSnapshot = { clone: data.slice().map(v => v.slice()) }
    let shots = []

    if (dataSnapshot.clone[y1][x1] === '#') {

      // set the place of the base to shoot from
      dataSnapshot.clone[y1][x1] = 'X'

      let asteroidLocs = []

      dataSnapshot.clone.forEach((v, y2) => v.forEach((v, x2) => {
        if (dataSnapshot.clone[y2][x2] === '#') {
          asteroidLocs.push([x2, y2])
        }
      }))

      // we need to now sort the location of asteroids as we will be shooting them closest first per rotation
      asteroidLocs.forEach((pos1, pos2) => Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]))

      asteroidLocs.forEach((pos) => findAsteroids(dataSnapshot, count, x1, y1, pos[0], pos[1]))

      // fire the shot and record it
      dataSnapshot.clone.forEach((v, y2) => v.forEach((v, x2) => {
        if (dataSnapshot.clone[y2][x2] === '#') {
          // had to google this
          let angle = Math.atan2(y2 - y1, x2 - x1) + (Math.PI / 2)
          if (angle < 0) {
            angle += Math.PI * 2
          }
          shots.push({ x: x2, y: y2, angle })
        }
      }))

      shots.sort((angle1, angle2) => angle1.angle - angle2.angle).slice()

      if (count.asteroids >= max) {
        topx = x1
        topy = y1
        max = count.asteroids
        bestShots = shots
      }
    }
  }))

  const shot = bestShots[199]
  console.log(shot.x * 100 + shot.y)
}

const findAsteroids = (dataSnapshot, count, x1, y1, x2, y2) => {
  let offsetX = x2 - x1
  let offsetY = y2 - y1
  let gcd = getGcd(offsetX, offsetY)
  offsetX /= gcd
  offsetY /= gcd

  while (1) {
    x2 += offsetX
    y2 += offsetY
    if (x2 >= 0 && x2 < dataSnapshot.clone.length && y2 >= 0 && y2 < dataSnapshot.clone[0].length) {
      if (dataSnapshot.clone[y2][x2] === '#') {
        count.asteroids -= 1
      }
      dataSnapshot.clone[y2][x2] = ' '
    } else {
      return
    }
  }
}

const getGcd = (x, y) => {
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) {
    let t = y
    y = x % y
    x = t
  }
  return x
}
