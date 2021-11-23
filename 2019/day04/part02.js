import _ from 'lodash'

export const solve = (data) => {
  const range = data[0].split('-')
  const low = Number(range[0])
  const high = Number(range[1])
  let count = 0
  for (let i = low; i <= high; i++) {
    if (hasPair(i) && digitsNeverDecrease(i)) {
      count++
    }
  }
  console.log(count)
}

const hasPair = (num) => {
  const str = num.toString()
  for (let i = 0; i < str.length - 1; i++) {
    if ((str[i] === str[i + 1])
      && (i === 0 || str[i - 1] !== str[i])
      && (i === str.length - 1 || str[i + 2] !== str[i])
    ) {
      return true
    }
  }
  return false
}

const digitsNeverDecrease = (num) => {
  const str = num.toString()
  for (let i = 0; i < str.length - 1; i++) {
    if (Number(str[i]) > Number(str[i + 1])) {
      return false
    }
  }
  return true
}
