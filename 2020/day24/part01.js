const _ = require('lodash')

const solve = (data) => {
  const pairs = parse(data)
  console.log(countBlackTiles(pairs))
}

const parse = (data) => {
  return data.map((line, i) => {
    let ew = 0
    let ns = 0
    let index = 0
    while (index < line.length) {
      const move = ['e', 'w'].includes(line[index]) ? line.substr(index, 1) : line.substr(index, 2)
      if (['e', 'w'].includes(move)) {
        ew += move === 'e' ? 1 : -1
        index++
      } else {
         ns += move[0] === 'n' ? 1 : -1
         ew += move[1] === 'e' ? 0.5 : -0.5
         index += 2
      }
    }
    return `${ew}|${ns}`
  })
}

const countBlackTiles = (pairs) => {
  const blackTiles = new Set()
  pairs.forEach((pair) => {
    if (blackTiles.has(pair)) blackTiles.delete(pair)
    else blackTiles.add(pair)
  })
  return blackTiles.size
}

module.exports = { solve }
