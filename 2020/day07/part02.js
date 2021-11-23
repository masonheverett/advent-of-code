import _ from 'lodash'

export const solve = (data) => {
  console.log(innerBagCount('shiny gold', parse(data)) - 1)
}

const innerBagCount = (bagName, rules) => {
  const bagRule = _.find(rules, (rule) => bagName === rule[0])
  return 1 + _.sumBy(bagRule[1], (innerBag) => {
    if (innerBag === 'no other') return 0
    const count = Number.parseInt(innerBag)
    const innerBagName = _.tail(innerBag.split(' ')).join(' ')
    return count * innerBagCount(innerBagName, rules)
  })
}

const parse = (data) => {
  return data.map((rule) => {
    const slim = rule.replace(/(bags? ?|\.)/g, '').trim()
    const pair = slim.split(' contain ')
    return [pair[0], pair[1].split(' , ')]
  })
}
