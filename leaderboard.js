const _ = require('lodash')
const https = require('https')
const options = {
  hostname: 'adventofcode.com',
  path: '/2019/leaderboard/private/view/69127.json',
  method: 'GET',
  headers: {
    'Cookie': 'session=53616c7465645f5fc56bfea444a873de1b4104de26de7b2024535b414fdffb40bbcd9e9a237ededd5f61fb8e35846edb'
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
    leaderboard.sort((a, b) => (a.stars > b.stars) ? -1 : ((a.stars == b.stars && a.local_score > b.local_score) ? -1 : 1));
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
