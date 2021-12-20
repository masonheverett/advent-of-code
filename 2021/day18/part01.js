import _ from 'lodash'

export const solve = (data) => {
  console.log(magnitude(data.reduce((prev, next) => {
    let num = `[${prev},${next}]`
    // console.log(`after addition: ${num}`)
    let explodeIndex = findExplodeIndex(num)
    while (explodeIndex > -1) {
      num = explode(num, explodeIndex)
      // console.log(`after explode:  ${num}`)
      explodeIndex = findExplodeIndex(num)
      while (explodeIndex < 0) {
        const splitIndex = findSplitIndex(num)
        if (splitIndex > -1) {
          num = split(num, splitIndex)
          // console.log(`after split:    ${num}`)
          explodeIndex = findExplodeIndex(num)
        } else break
      }
    }
    return num
  })))
}

const magnitude = (num) => {
  while (!isNumber(num.charAt(0))) {
    num = processLeaves(num)
  }
  return Number(num)
}

const processLeaves = (num) => {
  return num.replace(/\[(\d+),(\d+)\]/g, (match, p1, p2) => (3 * Number(p1) + 2 * Number(p2)).toString())
}

const findExplodeIndex = (num) => {
  let nestCount = 0
  for (let i = 0; i < num.length; i++) {
    if (num.charAt(i) === '[') nestCount++
    else if (num.charAt(i) === ']') nestCount--
    else if (nestCount > 4) return i
  }
  return -1
}

const explode = (num, index) => {
  const leftNum = readNum(num.substring(index))
  const rightNum = readNum(num.substring(index + leftNum.toString().length + 1))
  let leftBraceIndex = index - 1
  let rightBraceIndex = leftBraceIndex + leftNum.toString().length + rightNum.toString().length + 2
  for (let i = leftBraceIndex; i >= 0; i--) {
    if (isNumber(num.charAt(i))) {
      while (i >= 0 && isNumber(num.charAt(i - 1))) i--
      const toReplace = readNum(num.substring(i))
      const newNum = leftNum + toReplace
      const indexShift = (newNum.toString().length - toReplace.toString().length)
      leftBraceIndex += indexShift
      rightBraceIndex += indexShift
      num = `${num.substring(0, i)}${newNum}${num.substring(i + toReplace.toString().length)}`
      break
    }
  }
  for (let i = rightBraceIndex + 1; i < num.length; i++) {
    if (isNumber(num.charAt(i))) {
      const toReplace = readNum(num.substring(i))
      const newNum = rightNum + toReplace
      num = num.substring(0, i) + newNum + num.substring(i + toReplace.toString().length)
      break
    }
  }
  num = `${num.substring(0, leftBraceIndex)}0${num.substring(rightBraceIndex + 1)}`
  return num
}

const findSplitIndex = (num) => {
  for (let i = 0; i < num.length; i++) {
    if (isNumber(num.charAt(i)) && readNum(num.substring(i)) > 9) return i
  }
  return -1
}

const split = (num, index) => {
  const toReplace = readNum(num.substring(index))
  const firstNum = Math.floor(toReplace / 2)
  const secondNum = Math.ceil(toReplace / 2)
  return `${num.substring(0, index)}[${firstNum},${secondNum}]${num.substring(index + toReplace.toString().length)}`
}

const readNum = (str) => {
  return Number(_.takeWhile(str.split(''), isNumber).join(''))
}

const isNumber = (char) => {
  return ![',', '[', ']'].includes(char)
}
