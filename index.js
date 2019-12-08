// ================================================
// == Modify this part to run different problems ==
// ================================================

const YEAR = '2019'
const DAY = '07'
const PART = '02'

// ================================================
// == Don't touch any of this stuff... please... ==
// ================================================

const fs = require('fs')
const path = require('path')
const solve = require(`./${YEAR}/day${DAY}/part${PART}.js`).solve

const readLines = () => {
  filePath = path.join(__dirname, `./${YEAR}/day${DAY}/input.txt`)
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err || !data) {
      console.log(`Error reading file at ${filePath}`)
    } else {
      solve(data.split('\n').slice(0, -1))
    }
  })
}

readLines()
