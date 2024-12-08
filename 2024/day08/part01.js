import _ from 'lodash'

export const solve = (data) => {
  // Read in map
  const antennaLists = {}
  data.forEach((line, row) => {
    line.split('').forEach((char, col) => {
      // Create array of antenna coords per frequency
      if (char === '.') return
      if (!antennaLists[char]) antennaLists[char] = []
      antennaLists[char].push([row, col])
    })
  })
  // Loop through arrays of antenna coords
  const antinodes = new Set()
  for (const locs of Object.values(antennaLists)) {
    // Loop through all pairs for each frequency and find antinodes
    for (let ndx1 = 0; ndx1 < locs.length - 1; ndx1++) {
      for (let ndx2 = ndx1 + 1; ndx2 < locs.length; ndx2++) {
        // Calculate pair difference
        const antenna1 = locs[ndx1]
        const antenna2 = locs[ndx2]
        const rowDiff = antenna1[0] - antenna2[0]
        const colDiff = antenna1[1] - antenna2[1]
        // Find antinodes
        const antinode1 = [antenna1[0] + rowDiff, antenna1[1] + colDiff]
        const antinode2 = [antenna2[0] - rowDiff, antenna2[1] - colDiff]
        // Add antinodes that are in bounds
        if (antinode1[0] >= 0 && antinode1[0] < data.length && antinode1[1] >= 0 && antinode1[1] < data[0].length) {
          antinodes.add(`${antinode1[0]},${antinode1[1]}`)
        }
        if (antinode2[0] >= 0 && antinode2[0] < data.length && antinode2[1] >= 0 && antinode2[1] < data[0].length) {
          antinodes.add(`${antinode2[0]},${antinode2[1]}`)
        }
      }
    }
  }
  console.log(antinodes.size)
}
