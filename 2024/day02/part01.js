import _ from 'lodash'

export const solve = (data) => {
  console.log(_.sum(data.map(line => {
    const report = _.split(line, ' ')
    return report.reduce(([safe, inc], nextLevel, nextNdx) => {
      // Skip the first number
      if (nextNdx === 0) return [true, true]
      // Short circuit if not safe
      if (!safe) return [false, null]
      // Find the difference and order
      const rawlevelDiff = _.toNumber(report[nextNdx - 1]) - _.toNumber(nextLevel)
      const absLevelDiff = Math.abs(rawlevelDiff)
      const inRange = absLevelDiff < 4 && absLevelDiff > 0
      const levelInc = rawlevelDiff < 0
      // Short circuit if first comparison
      if (nextNdx == 1) return [inRange, levelInc]
      return [inRange && levelInc === inc, inc]
    }, [true, true])[0]
  })))
}
