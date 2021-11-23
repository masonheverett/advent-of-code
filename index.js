import { readFile } from 'fs'
import { EOL } from 'os'
import { dirname, join } from 'path'

const year = process.argv[2]
const day = process.argv[3]
const part = process.argv[4]

const { solve } = await import(`./${year}/day${day}/part${part}.js`)
const filePath = join(dirname(new URL(import.meta.url).pathname), `./${year}/day${day}/input.txt`)

readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
  if (err || !data) {
    console.log(`Error reading file at ${filePath}`)
  } else {
    solve(data.split(EOL).slice(0, -1))
  }
})
