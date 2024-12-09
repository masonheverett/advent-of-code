import _ from 'lodash'

export const solve = (data) => {
  // Create expanded map
  let expanded = []
  data[0].split('').forEach((digit, ndx) => {
    let id = -1
    if (!(ndx % 2)) id = ndx / 2
    _.times(digit, () => expanded.push(id))
  })
  // Move blocks
  while (expanded.includes(-1)) {
    expanded.splice(expanded.indexOf(-1), 1, expanded[expanded.length - 1])
    expanded.pop()
  }
  // Calculate checksum
  console.log(_.sum(expanded.map((digit, ndx) => digit * ndx)))
}
