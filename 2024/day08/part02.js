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
        let anRow = antenna1[0]
        let anCol = antenna1[1]
        while (anRow >= 0 && anRow < data.length && anCol >= 0 && anCol < data[0].length) {
          antinodes.add(`${anRow},${anCol}`)
          anRow += rowDiff
          anCol += colDiff
        }
        anRow = antenna1[0] - rowDiff
        anCol = antenna1[1] - colDiff
        while (anRow >= 0 && anRow < data.length && anCol >= 0 && anCol < data[0].length) {
          antinodes.add(`${anRow},${anCol}`)
          anRow -= rowDiff
          anCol -= colDiff
        }
      }
    }
  }
  console.log(antinodes.size)
}
