import _ from 'lodash'

export const solve = (data) => {
  data = data[0].split(',')
  for (let i = 0; i < data.length; i++) {
    data[i] = parseInt(data[i], 10)
  }
  for (let j = 0; j < 100; j++) {
    for (let k = 0; k < 100; k++) {
      const tempData = [data[0], k, j].concat(data.slice(3))
      if (findValue(tempData) == 19690720) {
        console.log((100 * k) + j)
        k = 100
        j = 100
      }
    }
  }
}

const findValue = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    switch (data[i]) {
      case 1:
        data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]]
        break
      case 2:
        data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]]
        break
      case 99:
        i = data.length
        break
      default:
        break
    }
  }
  return data[0]
}
