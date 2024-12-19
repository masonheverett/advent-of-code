import _ from 'lodash'

const cache = {}

export const solve = (data) => {
  // Parse towels
  const towels = new Set(data[0].split(', '))
  // Check each pattern
  console.log(data.slice(2).filter(pattern => isPossible(towels, pattern)).length)
}

const isPossible = (towels, pattern) => {
  // Check the cache
  if (cache[pattern] !== undefined) return cache[pattern]
  // Check if this pattern is a whole towel
  if (towels.has(pattern)) return true
  // Try every single point split of the pattern
  for (let i = 1; i < pattern.length; i++) {
    // If the left side is a towel, recurse with the right side
    if (towels.has(pattern.slice(0, i))) {
      if(isPossible(towels, pattern.slice(i))) {
        // Update the cache and return when you find something
        cache[pattern] = true
        return true
      }
    }
  }
  // Update the cache and return that you didn't find something
  cache[pattern] = false
  return false
}
