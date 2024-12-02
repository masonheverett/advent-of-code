import _ from 'lodash'

export const solve = (data) => {
  const players = [{
    position: Number(data[0].substring(28)),
    score: 0
  }, {
    position: Number(data[1].substring(28)),
    score: 0
  }]
  const roll = getRoller()
  let turns = 0
  while (players[0].score < 1000 && players[1].score < 1000) {
    const player = players[turns % 2]
    const spaces = roll() + roll() + roll()
    player.position = (player.position + spaces) % 10
    if (player.position === 0) player.position = 10
    player.score += player.position
    turns++
  }
  console.log(turns * 3 * players[turns % 2].score)
}

const getRoller = () => {
  let nextRoll = 1
  return () => {
    const roll = nextRoll
    nextRoll = (roll % 100) + 1
    return roll
  }
}
