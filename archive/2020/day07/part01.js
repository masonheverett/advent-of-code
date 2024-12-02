import _ from 'lodash'

export const solve = (data) => {
  const rules =  parse(data)
  const containers = new Set()
  searchForContainers('shiny gold', containers, rules)
  console.log(containers.size)
}

const searchForContainers = (bagName, containers, rules) => {
  rules.forEach((rule) => {
    if (rule[1].includes(bagName) && !containers.has(rule[0])) {
      containers.add(rule[0])
      searchForContainers(rule[0], containers, rules)
    }
  })
}

const parse = (data) => {
  return data.map((rule) => {
    const slim = rule.replace(/(bags? ?|\.|\d+ )/g, '').trim()
    const pair = slim.split(' contain ')
    return [pair[0], pair[1].split(' , ')]
  })
}
