import _ from 'lodash'
let base_pattern = [0, 1, 0, -1]

export const solve = (data) => {
  let nums = data[0].split('').map(num => parseInt(num))
  console.log(phases(nums, 100))
}

const update_pattern = (pos, length) => {
  let new_pattern = []
  for (let n of base_pattern) {
    for (let r = 0; r < pos; r++) {
      new_pattern.push(n)
    }
  }
  let delta = length - new_pattern.length
  new_pattern.push(new_pattern.shift())
  for (let n = 0; n < delta; n++) {
    new_pattern.push(new_pattern[n])
  }
  return new_pattern
}

const decode = nums => {
  let newNums = []
  for (let i = 0; i < nums.length; i++) {
    const pattern = update_pattern(i + 1, nums.length)
    let updated = []
    for (j = 0; j < nums.length; j++) {
      updated.push(nums[j] * pattern[j])
    }
    newNums.push(updated)
  }
  return newNums.map(a => {
    let n = a.reduce((acc, val) => acc + val)
    return (Math.abs(n) % 10).toString()
  }).join('')
}

const phases = (next, runs, counter = 0) => {
  return counter === runs ? next.slice(0, 8) : phases(decode(next), runs, counter + 1)
}
