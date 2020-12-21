const _ = require('lodash')

const solve = (data) => {
  const { rules, messages } = parse(data)
  const ruleZeroRegex = new RegExp(`^${toRegex(rules[0], rules)}\$`)
  console.log(messages.filter((message) => message.match(ruleZeroRegex)).length)
}

const toRegex = (rule, rules) => {
  if (_.isString(rule)) {
    return rule
  } else if (_.isNumber(rule[0])) {
    return rule.reduce((prev, curr) => {
      if (curr === 8) return `${prev}(?:${toRegex(rules[42], rules)})+`
      if (curr === 11) return `${prev}(?:${ruleElevenRegex(rules)})`
      return `${prev}${toRegex(rules[curr], rules)}`
    }, '')
  } else {
    return `(?:${toRegex(rule[0], rules)}|${toRegex(rule[1], rules)})`
  }
}

// Matching a^nb^n is too hard, just check up to 50 of each
const ruleElevenRegex = (rules) => {
  return _.range(1, 51).map((num) => {
    return `(?:${toRegex(rules[42], rules)}){${num}}(?:${toRegex(rules[31], rules)}){${num}}`
  }).join('|')
}

const parse = (data) => {
  let isMessage = false
  const rules = []
  const messages = []
  data.forEach((line) => {
    if (isMessage) {
      messages.push(line)
    } else if (line === '') {
      isMessage = true
    } else {
      const rulePair = line.split(':')
      const ruleNum = Number(rulePair[0])
      const ruleString = rulePair[1].trim().split(' | ')
      let rule
      if (ruleString[0][0] === '"') {
        rule = ruleString.map((part) => part.replace(/"/g, ''))[0][0]
      } else if (ruleString.length > 1) {
        rule = ruleString.map((part) => part.split(' ').map(Number))
      } else {
        rule = ruleString.map((part) => part.split(' '))[0].map(Number)
      }
      rules.push([ruleNum, rule])
    }
  })
  sortedRules = rules.sort((a, b) => a[0] - b[0]).map((rule) => rule[1])
  return { rules: sortedRules, messages }
}

module.exports = { solve }
