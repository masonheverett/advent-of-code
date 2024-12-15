import _ from 'lodash'

const WIDTH = 101
const HEIGHT = 103
const SECONDS = 10000

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
  _.times(SECONDS, second => {
    const grid = []
    _.times(HEIGHT, () => {
      grid.push([])
      _.times(WIDTH, () => {
        _.last(grid).push('.')
      })
    })
    _.fill(Array(HEIGHT), _.fill(Array(WIDTH), '.'))
    robots.forEach(robot => {
      // Move robots
      robot.position[0] += robot.velocity[0]
      robot.position[1] += robot.velocity[1]
      // Factor in teleporting
      while (robot.position[0] < 0) robot.position[0] += WIDTH
      while (robot.position[0] >= WIDTH) robot.position[0] -= WIDTH
      while (robot.position[1] < 0) robot.position[1] += HEIGHT
      while (robot.position[1] >= HEIGHT) robot.position[1] -= HEIGHT
      grid[robot.position[1]][robot.position[0]] = 'X'
    })
    // Display
    console.log(second)
    grid.forEach(row => console.log(row.join('')))
  })
}
