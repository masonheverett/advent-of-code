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
  const outOfOrderUpdates = updates.filter(update => {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (rules[update[j]] && rules[update[j]].has(update[i])) return true
      }
    }
    return false
  })
  console.log(_.sum(outOfOrderUpdates.map(update => {
    let i = 0
    const sorted = update.sort((page1, page2) => {
      if (rules[page1].has(page2)) return -1
      if (rules[page2].has(page1)) return 1
      return 0
    })
    return _.toNumber(sorted[(update.length - 1) / 2])
  })))
}
