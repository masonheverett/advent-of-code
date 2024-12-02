import _ from 'lodash'

export const solve = (data) => {
  let nums = data[0].repeat(10000).split('').map(num => parseInt(num))
  const offset = parseInt(nums.slice(0, 7).join(''), 10)
  nums = nums.slice(offset)
  console.log(phases(nums).slice(0, 8).join(''))
}

const phases = (nums) => {
  for (let i = 0; i < 100; i++) {
    for (let j = nums.length - 1; j >= 0; j--) {
      nums[j] = ((nums[j + 1] || 0) + nums[j]) % 10
    }
  }
  return nums
}
