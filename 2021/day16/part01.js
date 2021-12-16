import _ from 'lodash'

let versionSum = 0

export const solve = (data) => {
  readPacket(parseInput(data))
  console.log(versionSum)
}

const readPacket = (packet) => {
  versionSum += Number(`0b${packet.slice(0, 3)}`)
  const typeId = Number(`0b${packet.slice(3, 6)}`)
  if (typeId === 4) {
    return readLiteral(packet.slice(6))
  } else {
    const lengthTypeId = packet.charAt(6)
    if (lengthTypeId === '0') {
      return readSubPacketsByLength(packet.slice(22), Number(`0b${packet.slice(7, 22)}`))
    } else {
      return readSubPacketsByCount(packet.slice(18), Number(`0b${packet.slice(7, 18)}`))
    }
  }
}

const readSubPacketsByLength = (payload, length) => {
  let leftover = readPacket(payload)
  while (length !== payload.length - leftover.length) {
    leftover = readPacket(leftover)
  }
  return payload.slice(length)
}

const readSubPacketsByCount = (payload, count) => {
  let leftover = payload
  for (let i = 0; i < count; i++) {
    leftover = readPacket(leftover)
  }
  return leftover
}

const readLiteral = (payload) => {
  let literal = ''
  let i = 0
  while (true) {
    literal += payload.slice(i + 1, i + 5)
    if (payload.charAt(i) === '0') {
      return payload.slice(i + 5)
    }
    i += 5
  }
}

const parseInput = (data) => {
  return data[0].split('').map(hexToBin).join('')
}

const hexToBin = (char) => {
  const bin = Number(`0x${char}`).toString(2)
  if (bin.length === 4) return bin
  return _.times(4 - bin.length, _.constant(0)).join('') + bin
}
