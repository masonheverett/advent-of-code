import _ from 'lodash'
import https from 'https'
import { sprintf } from 'sprintf-js'

const options = {
  hostname: 'adventofcode.com',
  path: '/2021/leaderboard/private/view/710015.json',
  headers: {
    'Cookie': 'session=53616c7465645f5f26197832fd71e86414a2a4a8166b1ba467d4f772bf84fb985c5098928a81c06fa5fd6283f9afd65f',
  },
}

const printBoard = (data) => {
  console.log(`
                     1111111111222222
            1234567890123456789012345`)
  _.values(data.members).sort((a, b) => {
    return (a.local_score > b.local_score) ? -1 : ((a.local_score == b.local_score && a.stars > b.stars) ? -1 : 1)
  }).forEach((member, index) => {
    let output = sprintf('%4d) %5d ', index + 1, member.local_score)
    for (let i = 1; i < 26; i++) {
      if (_.size(member.completion_day_level[i.toString()]) === 2) {
        output += '*'
      } else if (_.size(member.completion_day_level[i.toString()]) === 1) {
        output += '-'
      } else {
        output += ' '
      }
    }
    output += `  ${member.name}`
    console.log(output)
  })
  console.log('')
}

https.request(options, res => {
  let data = ''
  res.on('data', chunk => data += chunk)
  res.on('end', () => printBoard(JSON.parse(data)))
}).on('error', error => {
  console.log(error)
}).end()
