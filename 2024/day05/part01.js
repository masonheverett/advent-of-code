import _ from 'lodash'

export const solve = (data) => {
  const rules = {}
  const updates = []
  data.forEach(line => {
    if (line.includes('|')) {
      const pair = line.split('|')
      if (rules[pair[0]] === undefined) rules[pair[0]] = new Set()
      rules[pair[0]].add(pair[1])
    }
    if (line.includes(',')) {
      updates.push(line.split(','))
    }
  })
  console.log(_.sum(updates.map(update => {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (rules[update[j]] && rules[update[j]].has(update[i])) return 0
      }
    }
    return _.toNumber(update[(update.length - 1) / 2])
  })))
}
