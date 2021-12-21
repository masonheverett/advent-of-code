import _ from 'lodash'

export const solve = (data) => {
  console.log(
    data.map(line => new TreeNode().fromString(line))
      .reduce((prev, next) => new TreeNode().withChildren(prev, next).reduce())
      .magnitude()
  )
}

const readNum = (str) => {
  return Number(_.takeWhile(str.split(''), isNumber).join(''))
}

const isNumber = (char) => {
  return ![',', '[', ']'].includes(char)
}

const switchLastFork = (str, from, to) => {
  const lastIndex = _.lastIndexOf(str.split(''), from)
  return `${str.substring(0, lastIndex)}${to}`
}

class TreeNode {
  fromString(str) {
    if (isNumber(str.charAt(0))) {
      this.value = readNum(str)
    } else {
      const comma = this.findCommaIndex(str)
      this.left = new TreeNode().fromString(str.substring(1, comma))
      this.right = new TreeNode().fromString(str.substring(comma + 1))
    }
    return this
  }

  withValue(value) {
    this.value = value
    return this
  }

  withChildren(left, right) {
    this.left = left
    this.right = right
    return this
  }

  toString() {
    if (this.value !== undefined) return this.value.toString()
    return `[${this.left.toString()},${this.right.toString()}]`
  }

  navigateTo(directions) {
    let nodeToReplace = this
    for (let i = 0; i < directions.length; i++) {
      if (directions.charAt(i) === 'L') nodeToReplace = nodeToReplace.left
      else nodeToReplace = nodeToReplace.right
    }
    return nodeToReplace
  }

  findCommaIndex(str) {
    let countOpen = 0
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === '[') countOpen++
      else if (str.charAt(i) === ']') countOpen--
      else if (str.charAt(i) === ',' && countOpen === 1) return i
    }
  }

  reduce() {
    let toExplode = this.firstToExplode('')
    while (toExplode !== undefined) {
      this.explode(toExplode)
      toExplode = this.firstToExplode('')
      while (toExplode === undefined) {
        let toSplit = this.firstToSplit('')
        if (toSplit !== undefined) {
          this.split(toSplit)
          toExplode = this.firstToExplode('')
        } else break
      }
    }
    return this
  }

  firstToExplode(directions) {
    if (this.value !== undefined) {
      if (directions.length > 4) return directions.substring(0, directions.length - 1)
      return undefined
    }
    const left = this.left.firstToExplode(directions + 'L')
    if (left !== undefined) return left
    const right = this.right.firstToExplode(directions + 'R')
    if (right !== undefined) return right
    return undefined
  }

  explode(directions) {
    let nodeToReplace = this.navigateTo(directions)
    if (_.includes(directions, 'R')) {
      let leftNode = this.navigateTo(switchLastFork(directions, 'R', 'L'))
      while (leftNode.value === undefined) leftNode = leftNode.right
      leftNode.value += nodeToReplace.left.value
    }
    if (_.includes(directions, 'L')) {
      let rightNode = this.navigateTo(switchLastFork(directions, 'L', 'R'))
      while (rightNode.value === undefined) rightNode = rightNode.left
      rightNode.value += nodeToReplace.right.value
    }
    nodeToReplace.left = undefined
    nodeToReplace.right = undefined
    nodeToReplace.value = 0
    return this
  }

  firstToSplit(directions) {
    if (this.value !== undefined) {
      if (this.value > 9) return directions
      return undefined
    }
    const left = this.left.firstToSplit(directions + 'L')
    if (left !== undefined) return left
    const right = this.right.firstToSplit(directions + 'R')
    if (right !== undefined) return right
    return undefined
  }

  split(directions) {
    const nodeToReplace = this.navigateTo(directions)
    nodeToReplace.left = new TreeNode().withValue(Math.floor(nodeToReplace.value / 2))
    nodeToReplace.right = new TreeNode().withValue(Math.ceil(nodeToReplace.value / 2))
    nodeToReplace.value = undefined
    return this
  }

  magnitude() {
    if (this.value !== undefined) return this.value
    return 3 * this.left.magnitude() + 2 * this.right.magnitude()
  }
}
