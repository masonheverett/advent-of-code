import _ from 'lodash'

export const solve = (data) => {
  let template = parseTemplate(data)
  const rules = parseRules(data)
  for (let i = 0; i < 40; i++) {
    template = grow(template, rules)
  }
  const firstChar = data[0][0]
  const lastChar = data[0][data[0].length - 1]
  const counts = getCounts(template, firstChar, lastChar)
  console.log(_.max(counts) - _.min(counts))
}

const parseTemplate = (data) => {
  const line = data[0]
  const template = {}
  for (let i = 0; i < line.length - 1; i++) {
    const pair = line.slice(i, i + 2)
    if (template[pair] === undefined) template[pair] = 1
    else template[pair]++
  }
  return template
}

const parseRules = (data) => {
  return _.slice(data, 2)
    .map(line => line.split(' -> '))
    .reduce((prev, next) => {
      prev[next[0]] = next[1]
      return prev
    }, {})
}

const grow = (template, rules) => {
  let newTemplate = {}
  _.entries(template).forEach(entry => {
    const firstChar = entry[0][0]
    const secondChar = entry[0][1]
    const newChar = rules[entry[0]]
    const count = entry[1]
    if (newTemplate[`${firstChar}${newChar}`] === undefined) newTemplate[`${firstChar}${newChar}`] = 0
    if (newTemplate[`${newChar}${secondChar}`] === undefined) newTemplate[`${newChar}${secondChar}`] = 0
    newTemplate[`${firstChar}${newChar}`] += count
    newTemplate[`${newChar}${secondChar}`] += count
  })
  return newTemplate
}

const getCounts = (template, first, last) => {
  const counts = {}
  _.entries(template).forEach(entry => {
    const firstChar = entry[0][0]
    const secondChar = entry[0][1]
    const count = entry[1]
    if (counts[firstChar] === undefined) counts[firstChar] = 0
    if (counts[secondChar] === undefined) counts[secondChar] = 0
    counts[firstChar] += count
    counts[secondChar] += count
  })
  counts[first]++
  counts[last]++
  return _.values(counts).map(count => count / 2)
}
