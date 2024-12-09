import _ from 'lodash'

export const solve = (data) => {
  // Create expanded map
  let expanded = []
  const fileSizes = {}
  const fileStarts = {}
  data[0].split('').forEach((digit, ndx) => {
    let id = -1
    if (!(ndx % 2)) {
      id = ndx / 2
      fileSizes[id] = _.toNumber(digit)
      fileStarts[id] = expanded.length
    }
    _.times(digit, () => expanded.push(id))
  })
  // Move blocks
  let idToMove = expanded[expanded.length - 1]
  while (idToMove > 0) {
    // Find new location
    const freeSpaceNdx = expanded.findIndex((_, ndx) => {
      // Check in bounds
      if (ndx + fileSizes[idToMove] > expanded.length) return false
      // Check if free space is after current space
      if (ndx > fileStarts[idToMove]) return false
      // Check equality
      return expanded.slice(ndx, ndx + fileSizes[idToMove]).every(val => val === -1)
    })
    if (freeSpaceNdx > -1) {
      // Copy file
      expanded.splice(freeSpaceNdx, fileSizes[idToMove], ...(_.times(fileSizes[idToMove], () => idToMove)))
      // Delet old file
      expanded.splice(fileStarts[idToMove], fileSizes[idToMove], ...(_.times(fileSizes[idToMove], () => -1)))
    }
    // Next ID
    idToMove--
  }
  // Calculate checksum
  console.log(_.sum(expanded.map((digit, ndx) => (digit === -1 ? 0 : digit) * ndx)))
}
