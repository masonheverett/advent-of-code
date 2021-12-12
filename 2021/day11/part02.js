import _ from 'lodash'

export const solve = (data) => {
  const grid = data.map(line => line.split('').map(Number))
  const maxSteps = 400
  var flashCount = 0
  var steps = 0
  
  for(steps = 0; steps < maxSteps; steps++) {
    stepTransform(grid)
    flashCount += processFlashes(grid)
    if(_.isEqual(grid, simultaneousPattern)) {
      steps++
      break
    }
  }
  console.log(steps)
  console.log(grid)
  console.log(flashCount)
}

const stepTransform = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col]++
    }
  }
}

const processFlashes = (grid) => {
  var flashCount = 0
  while(!isGridComplete(grid)) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if(grid[row][col] > 9) {
          for(let flashRow = row-1; flashRow <= row+1; flashRow++) {
            for(let flashCol = col-1; flashCol <= col+1; flashCol++) {
              if((flashRow >= 0 && flashCol >= 0) && (flashRow < grid.length && flashCol < grid[row].length) && grid[flashRow][flashCol] > 0) {
                grid[flashRow][flashCol]++
              } 
            }
          }
          flashCount++
          grid[row][col] = 0
        }
      }
    }
  }
  return flashCount
}

const isGridComplete = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    if(grid[row].find(element => element > 9) !== undefined) {
      return false;
    }
  }
  return true
}

const simultaneousPattern = [
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ]
]