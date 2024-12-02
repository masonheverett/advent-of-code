import _ from 'lodash'

export const solve = (data) => {
  console.log(readPacket(parseInput(data)).value)
}

const readPacket = (packet) => {
  const typeId = Number(`0b${packet.slice(3, 6)}`)
  if (typeId === 4) return readLiteral(packet.slice(6))

  let result
  if (packet.charAt(6) === '0') {
    result = readSubPacketsByLength(packet.slice(22), Number(`0b${packet.slice(7, 22)}`))
  } else {
    result = readSubPacketsByCount(packet.slice(18), Number(`0b${packet.slice(7, 18)}`))
  }

  let value
  switch(typeId) {
    case 0:
      value = result.values.reduce((prev, next) => prev + next)
      break
    case 1:
      value = result.values.reduce((prev, next) => prev * next)
      break
    case 2:
      value = _.min(result.values)
      break
    case 3:
      value = _.max(result.values)
      break
    case 5:
      value = result.values[0] > result.values[1] ? 1 : 0
      break
    case 6:
      value = result.values[0] < result.values[1] ? 1 : 0
      break
    case 7:
      value = result.values[0] === result.values[1] ? 1 : 0
      break
  }
  return { value, leftover: result.leftover }
}

const readSubPacketsByLength = (payload, length) => {
  let result
  let values = []
  let leftover = payload
  do {
    result = readPacket(leftover)
    values.push(result.value)
    leftover = result.leftover
  } while (length !== payload.length - leftover.length)
  return { values, leftover }
}

const readSubPacketsByCount = (payload, count) => {
  let result
  let values = []
  let leftover = payload
  for (let i = 0; i < count; i++) {
    result = readPacket(leftover)
    values.push(result.value)
    leftover = result.leftover
  }
  return { values, leftover }
}

const readLiteral = (payload) => {
  let literal = ''
  let i = 0
  while (true) {
    literal += payload.slice(i + 1, i + 5)
    if (payload.charAt(i) === '0') {
      return { value: Number(`0b${literal}`), leftover: payload.slice(i + 5) }
    }
    i += 5
  }
}

const parseInput = (data) => {
  return data[0].split('').map(char => {
    const bin = Number(`0x${char}`).toString(2)
    if (bin.length === 4) return bin
    return _.times(4 - bin.length, _.constant(0)).join('') + bin
  }).join('')
}
