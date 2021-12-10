import _ from 'lodash'
import https from 'https'

const options = {
  hostname: 'adventofcode.com',
  path: '/2021/leaderboard/private/view/710015.json',
  headers: {
    'Cookie': 'session=53616c7465645f5f26197832fd71e86414a2a4a8166b1ba467d4f772bf84fb985c5098928a81c06fa5fd6283f9afd65f',
  },
}

https.request(options, res => {
  let data = ''
  res.on('data', chunk => data += chunk)
  res.on('end', () => {
    const obj = JSON.parse(data)
    const leaderboard = []
    Object.keys(obj.members).forEach(uid => {
      leaderboard.push({
        name: obj['members'][uid]['name'],
        stars: obj['members'][uid]['stars'],
        local_score: obj['members'][uid]['local_score'],
      })
    })
    leaderboard.sort((a, b) => {
      return (a.local_score > b.local_score) ? -1 : ((a.local_score == b.local_score && a.stars > b.stars) ? -1 : 1)
    })
    process.stdout.write("Place\tScore\tStars\tName\n")
    leaderboard.forEach(u => {
      process.stdout.write((leaderboard.indexOf(u) + 1) + ":\t" + u.local_score + "\t" + u.stars + "\t" + u.name + "\n")
    })
  })
}).on('error', error => {
  console.log(error)
}).end()
