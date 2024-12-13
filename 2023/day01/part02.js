import _ from 'lodash'

const NUMBER_MAP = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9'
}
const PATTERN = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g

export const solve = (data) => {
  console.log(_.sum(data.map(line => {
    const matches = Array.from(line.matchAll(PATTERN))
    return _.toNumber(NUMBER_MAP[_.first(matches)[1]] + NUMBER_MAP[_.last(matches)[1]])
  })))
}
