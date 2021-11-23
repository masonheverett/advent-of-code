import _ from 'lodash'

export const solve = (data) => {
  const nums = data[0].split(',')
  const lastSeen = {}
  nums.forEach((num, index) => {
    if (index < nums.length - 1) {
      lastSeen[num] = index
    }
  })
  while (nums.length < 30000000) {
    const next = nextNumber(nums, lastSeen)
    lastSeen[nums[nums.length - 1]] = nums.length - 1
    nums.push(next)
    if (nums.length % 1000000 === 0) {
      console.log(`${nums.length / 1000000} million turns in...`)
    }
  }
  console.log(nums[29999999])
}

const nextNumber = (nums, lastSeen) => {
  const last = lastSeen[nums[nums.length - 1]]
  if (last === undefined) return '0'
  return (nums.length - last - 1).toString()
}
