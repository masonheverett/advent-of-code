import _ from 'lodash'

const cache = {}

export const solve = (data) => {
  // Parse towels
  const towels = new Set(data[0].split(', '))
  // Check each pattern
  console.log(_.sum(data.slice(2).map(pattern => matchCount(towels, pattern))))
}

const matchCount = (towels, pattern) => {
  // Check the cache
  if (cache[pattern] !== undefined) return cache[pattern]
  // Check if this pattern is a whole towel
  let count = towels.has(pattern) ? 1 : 0
  // Try every single point split of the pattern
  for (let i = 1; i < pattern.length; i++) {
    // If the left side is a towel, recurse with the right side
    if (towels.has(pattern.slice(0, i))) {
      count += matchCount(towels, pattern.slice(i))
    }
  }
  // Update the cache and return the count
  cache[pattern] = count
  return count
}
