import _ from 'lodash'

export const solve = (data) => {
  const buses = parse(data)
  let num = buses[0][0]
  let currPost = 1
  let toAdd = buses[0][0]
  while (true) {
    for (let i = currPost; i < buses.length; i++) {
      if ((num + buses[i][1]) % buses[i][0] === 0) {
        toAdd *= buses[i][0]
        currPost++
      } else {
        break
      }
    }
    if (currPost === buses.length) break
    num += toAdd
  }
  console.log(num)
}

const parse = (data) => {
  return data[1].split(',')
    .map((id, index) => [id, index])
    .filter((bus) => bus[0] !== 'x')
    .map((bus) => [parseInt(bus[0]), bus[1]])
}
