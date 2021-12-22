import _ from 'lodash'

// possible scores from 3 rolls and number of ways to get that score
const rolls = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]
const countCache = {}
const goal = 21

export const solve = (data) => {
  const players = [{
    position: Number(data[0].substring(28)),
    score: 0
  }, {
    position: Number(data[1].substring(28)),
    score: 0
  }]
  let turn = 0
  console.log(_.max(winCounts(players, turn)))
}

const winCounts = (players, turn) => {
  if (players[0].score >= goal) return [1, 0]
  if (players[1].score >= goal) return [0, 1]
  const cacheKey = getCacheKey(players, turn)
  if (countCache[cacheKey] !== undefined) return countCache[cacheKey]
  countCache[cacheKey] = rolls.map(pair => {
    return winCounts(takeTurn(_.cloneDeep(players), turn, pair[0]), turn + 1).map(count => count * pair[1])
  }).reduce((prev, next) => {
    return [prev[0] + next[0], prev[1] + next[1]]
  })
  return countCache[cacheKey]
}

const takeTurn = (players, turn, roll) => {
  const player = players[turn % 2]
  player.position = (player.position + roll) % 10
  if (player.position === 0) player.position = 10
  player.score += player.position
  return players
}

const getCacheKey = (players, turn) => {
  const p1 = players[0]
  const p2 = players[1]
  return `${p1.position}|${p1.score}|${p2.position}|${p2.score}|${turn % 2}`
}
