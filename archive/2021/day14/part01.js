import _ from 'lodash'

export const solve = (data) => {
  let template = data[0]
  const rules = parseRules(data)
  for (let i = 0; i < 10; i++) {
    template = grow(template, rules)
  }
  const counts = _.values(_.countBy(template.split('')))
  console.log(_.max(counts) - _.min(counts))
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
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2)
    if (rules[pair] !== undefined) {
      template = template.slice(0, i + 1) + rules[pair] + template.slice(i + 1)
      i++
    }
  }
  return template
}
