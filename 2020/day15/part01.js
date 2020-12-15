const _ = require('lodash')

const solve = (data) => {
  const nums = data[0].split(',').map(Number)
  while (nums.length < 2020) {
    nums.push(nextNumber(nums))
  }
  console.log(nums[2019])
}

const nextNumber = (nums) => {
  const last = _.findLastIndex(nums, (num) => num === nums[nums.length - 1], nums.length - 2)
  if (last === -1) return 0
  return nums.length - last - 1
}

module.exports = { solve }
