const _ = require('lodash')
const https = require('https')
const options = {
  hostname: 'adventofcode.com',
  path: '/2020/leaderboard/private/view/710015.json',
  method: 'GET',
  headers: {
    'Cookie': 'session=53616c7465645f5f5f70ff23b1927741e956e864c02995c20d8d640d1994e767908cbedc36cca27e5cbc5aeb6b3b39ad'
  }
}

const req = https.request(options, res => {
  res.on('data', d => {
    const obj = JSON.parse(d)
    const user_ids = Object.keys(obj.members)
    var leaderboard = []
    _.each(user_ids, uid => {
      var user_info = {}
      user_info.name = obj['members'][uid]['name']
      user_info.stars = obj['members'][uid]['stars']
      user_info.local_score = obj['members'][uid]['local_score']
      leaderboard.push(user_info)
    });
    leaderboard.sort((a, b) => (a.local_score > b.local_score) ? -1 : ((a.local_score == b.local_score && a.stars > b.stars) ? -1 : 1));
    process.stdout.write("Place\tScore\tStars\tName\n")
    _.each(leaderboard, u => {
      process.stdout.write((leaderboard.indexOf(u) + 1) + ":\t" + u.local_score + "\t" + u.stars + "\t" + u.name + "\n")
    });
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
