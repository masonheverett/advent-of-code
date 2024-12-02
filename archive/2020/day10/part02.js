import _ from 'lodash'

const tribValues = [0, 1, 1]

export const solve = (data) => {
  const adapters = parse(data)
  const chunks = createChunks(adapters)
  const counts = chunks.map(arrangements)
  console.log(counts.reduce((prev, curr) => prev * curr))
}

const arrangements = (data) => {
  if (data.length === 1) return 1
  if (data[data.length - 1] - data[0] === data.length - 1) return tribonacci(data.length)
  return bruteForce(data, 1)
}

const tribonacci = (length) => {
  while (length > tribValues.length - 1) {
    const tvLength = tribValues.length
    tribValues.push(tribValues[tvLength- 1] + tribValues[tvLength - 2] + tribValues[tvLength - 3])
  }
  return tribValues[length]
}

const bruteForce = (data, start) => {
  let count = 1
  for (let i = start; i < data.length - 1; i++) {
    if (data[i + 1] - data[i - 1] < 4) {
      count += arrangements(_.without(data, data[i]), i)
    }
  }
  return count
}

const createChunks = (data) => {
  const chunks = []
  let chunkStart = 0
  for (let i = 0; i < data.length; i++) {
    if ((i === data.length - 1) || data[i] + 2 < data[i + 1]) {
      chunks.push(data.slice(chunkStart, i + 1))
      chunkStart = i + 1
    }
  }
  return chunks
}

const parse = (data) => {
  const sorted = data.map((num) => parseInt(num)).sort((a, b) => a - b)
  sorted.unshift(0)
  return sorted
}
