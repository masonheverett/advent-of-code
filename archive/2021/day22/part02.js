import _ from 'lodash'

export const solve = (data) => {
  const onCuboids = []
  const overlaps = []
  parseData(data).forEach(([ turnOn, xmin, xmax, ymin, ymax, zmin, zmax ]) => {
    const currentCuboid = new Cuboid(new Range(xmin, xmax), new Range(ymin, ymax), new Range(zmin, zmax))
    const overlapsWithOnCuboids = onCuboids.filter(currentCuboid.isOverlapping).map(currentCuboid.getOverlap)
    const overlapsWithOverlaps = overlaps.filter(currentCuboid.isOverlapping).map(currentCuboid.getOverlap)
    onCuboids.push(...overlapsWithOverlaps)
    overlaps.push(...overlapsWithOnCuboids)
    if (turnOn) onCuboids.push(currentCuboid)
  })
  const onCount = _.sumBy(onCuboids, onCuboid => onCuboid.volume())
  const overlapCount = _.sumBy(overlaps, overlap => overlap.volume())
  console.log(onCount - overlapCount)
}

class Range {
  constructor(min, max) {
    this.min = min
    this.max = max
  }
  length = () => this.max - this.min + 1
  isOverlapping = (other) => this.min <= other.max && other.min <= this.max
  getOverlap = (other) => new Range(_.max([this.min, other.min]), _.min([this.max, other.max]))
}

class Cuboid {
  constructor(xRange, yRange, zRange) {
    this.xRange = xRange
    this.yRange = yRange
    this.zRange = zRange
  }
  volume = () => this.xRange.length() * this.yRange.length() * this.zRange.length()

  isOverlapping = (other) => (
    this.xRange.isOverlapping(other.xRange) &&
    this.yRange.isOverlapping(other.yRange) &&
    this.zRange.isOverlapping(other.zRange)
  )

  getOverlap = (other) => new Cuboid(
    this.xRange.getOverlap(other.xRange),
    this.yRange.getOverlap(other.yRange),
    this.zRange.getOverlap(other.zRange)
  )
}

const parseData = (data) => {
  return data.map(line => {
    const [onOff, cuboidString] = line.split(' ')
    const cuboid = cuboidString.split(',').map(axisRange => axisRange.substring(2).split('..').map(Number))
    return [
      (onOff === 'on' ? true : false),
      _.min(cuboid[0]),
      _.max(cuboid[0]),
      _.min(cuboid[1]),
      _.max(cuboid[1]),
      _.min(cuboid[2]),
      _.max(cuboid[2])
    ]
  })
}
