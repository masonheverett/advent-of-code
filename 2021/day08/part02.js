import _ from 'lodash'

export const solve = (data) => {
  console.log(_.sum(
    data.map(parseLine)
      .map(mapSegments)
      .map(nameDigits)
      .map(readDisplay)
  ))
}

const parseLine = (line) => {
  return line.split(' | ').map(section => section.split(' ').map(digit => digit.split('').sort().join('')))
}

// Segment by digit presence
// TM: 0,    2, 3,    5, 6, 7, 8, 9 / present in 8
// TL: 0,          4, 5, 6,    8, 9 / present in 6 / unique count
// TR: 0, 1, 2, 3, 4,       7, 8, 9 / present in 8
// MM:       2, 3, 4, 5, 6,    8, 9 / present in 7
// BL: 0,    2,          6,    8    / present in 4 / unique count
// BR: 0, 1,    3, 4, 5, 6, 7, 8, 9 / present in 9 / unique count
// BM: 0,    2, 3,    5, 6,    8, 9 / present in 7
const mapSegments = (display) => {
  const segments = {}

  const one = _.find(display[0], digit => digit.length === 2).split('')
  const four = _.find(display[0], digit => digit.length === 4).split('')
  const seven = _.find(display[0], digit => digit.length === 3).split('')

  // Present in exactly 8 unique digits
  segments.tl = findSegmentsByFrequency(display[0], 6)[0]
  // Present in exactly 5 unique digits
  segments.bl = findSegmentsByFrequency(display[0], 4)[0]
  // Present in exactly 9 unique digits
  segments.br = findSegmentsByFrequency(display[0], 9)[0]
  // Difference between 7 and 1
  segments.tm = _.difference(seven, one)[0]
  // Difference between 4 and (1 + TL)
  segments.mm = _.difference(four, [...one, segments.tl])[0]
  // Present in exactly 7 unique digits but not in digit 4
  segments.bm = findSegmentsByFrequency(display[0], 7).filter(letter => four.indexOf(letter) < 0)[0]
  // The last one
  segments.tr = _.difference('abcdefg'.split(''), _.values(segments))[0]

  return { display, segments }
}

const findSegmentsByFrequency = (allDigits, freq) => {
  return 'abcdefg'.split('').filter(letter => {
    return _.countBy(allDigits, digit => {
      return digit.indexOf(letter) > -1
    })[true] === freq
  })
}

const nameDigits = ({ display, segments }) => {
  const digits = new Array(10)
  display[0].forEach(digit => {
    if (digit.length === 2) digits[1] = digit
    else if (digit.length === 3) digits[7] = digit
    else if (digit.length === 4) digits[4] = digit
    else if (digit.length === 5) {
      if (digit.split('').indexOf(segments.br) < 0) digits[2] = digit
      else if (digit.split('').indexOf(segments.tr) < 0) digits[5] = digit
      else digits[3] = digit
    } else if (digit.length === 6) {
      if (digit.split('').indexOf(segments.mm) < 0) digits[0] = digit
      else if (digit.split('').indexOf(segments.tr) < 0) digits[6] = digit
      else digits[9] = digit
    } else digits[8] = digit
  })
  return { display, segments, digits }
}

const readDisplay = ({ display, digits }) => {
  return Number(display[1].map(digit => digits.indexOf(digit).toString()).join(''))
}
