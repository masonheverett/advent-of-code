const fs = require('fs')
const os = require('os')
const path = require('path')

const year = process.argv[2]
const day = process.argv[3]
const part = process.argv[4]

const solve = require(`./${year}/day${day}/part${part}.js`).solve
const filePath = path.join(__dirname, `./${year}/day${day}/input.txt`)

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
  if (err || !data) {
    console.log(`Error reading file at ${filePath}`)
  } else {
    solve(data.split(os.EOL).slice(0, -1))
  }
})
