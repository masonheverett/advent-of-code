import _ from 'lodash'

const WIDTH = 101
const HEIGHT = 103
const SECONDS = 101 * 103

export const solve = (data) => {
  // Parse input
  const robots = data.map(line => {
    const matches = Array.from(line.matchAll(/-?\d+/g))
    return {
      position: [_.toNumber(matches[0][0]), _.toNumber(matches[1][0])],
      velocity: [_.toNumber(matches[2][0]), _.toNumber(matches[3][0])]
    }
  })
  // Run timer
  _.times(SECONDS, () => {
    robots.forEach(robot => {
      // Move robots
      robot.position[0] += robot.velocity[0]
      robot.position[1] += robot.velocity[1]
      // Factor in teleporting
      while (robot.position[0] < 0) robot.position[0] += WIDTH
      while (robot.position[0] >= WIDTH) robot.position[0] -= WIDTH
      while (robot.position[1] < 0) robot.position[1] += HEIGHT
      while (robot.position[1] >= HEIGHT) robot.position[1] -= HEIGHT
    })
  })
  // Count quandrants
  const counts = [0, 0, 0, 0]
  robots.forEach(robot => {
    const xMid = (WIDTH - 1) / 2
    const yMid = (HEIGHT - 1) / 2
    if (robot.position[0] < xMid) {
      if (robot.position[1] < yMid) counts[0]++
      else if (robot.position[1] > yMid) counts[1]++
    } else if (robot.position[0] > xMid) {
      if (robot.position[1] < yMid) counts[2]++
      else if (robot.position[1] > yMid) counts[3]++
    }
  })
  console.log(counts[0] * counts[1] * counts[2] * counts[3])
}
