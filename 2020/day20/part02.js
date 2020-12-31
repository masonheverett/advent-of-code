const _ = require('lodash')

const solve = (data) => {
  const tiles = parse(data)
  matchEdges(tiles)
  const grid = initGrid(Math.sqrt(tiles.length))
  placeTilesInGrid(grid, _.groupBy(tiles, (tile) => tile.possibleNeighbors.length))
  let image = { content: recreateImage(grid), orientation: 0 }
  lookForMonsters(image)
  while (!hasMonster(image)) {
    image = nextImageOrientation(image)
    lookForMonsters(image)
  }
  console.log(countHashes(image))
}

const parse = (data) => {
  const chunks = _.chunk(data.filter((value) => value !== ''), data.indexOf(''))
  return chunks.map((chunk) => {
    return {
      id: Number(chunk.shift().substr(5, 4)),
      orientation: 0,
      top: chunk[0],
      right: chunk.map((row) => row[row.length - 1]).join(''),
      bottom: chunk[chunk.length - 1],
      left: chunk.map((row) => row[0]).join(''),
      content: chunk,
      possibleEdges: [
        chunk[0],
        chunk[0].split('').reverse().join(''),
        chunk.map((row) => row[row.length - 1]).join(''),
        chunk.map((row) => row[row.length - 1]).reverse().join(''),
        chunk[chunk.length - 1],
        chunk[chunk.length - 1].split('').reverse().join(''),
        chunk.map((row) => row[0]).join(''),
        chunk.map((row) => row[0]).reverse().join(''),
      ],
      possibleNeighbors: [],
    }
  })
}

const matchEdges = (tiles) => {
  _.range(0, tiles.length).forEach((i) => {
    _.range(i + 1, tiles.length).forEach((j) => {
      const common = _.intersection(tiles[i].possibleEdges, tiles[j].possibleEdges)
      if (common.length > 0) {
        tiles[i].possibleNeighbors.push({ id: tiles[j].id, edges: common })
        tiles[j].possibleNeighbors.push({ id: tiles[i].id, edges: common })
      }
    })
  })
}

const initGrid = (sideLength) => {
  return _.times(sideLength, () => Array(sideLength))
}

const placeTilesInGrid = (grid, groups) => {
  fillInTopRow(grid, groups)
  _.range(1, grid.length - 1).forEach((rowNum) => fillInMiddleRow(grid, groups, rowNum))
  fillInBottomRow(grid, groups)
}

const fillInTopRow = (grid, groups) => {
  // Set top left corner
  grid[0][0] = groups['2'].shift()
  // Rotate top left corner
  while (
    matchingEdges(grid[0][0]).includes(grid[0][0].top) ||
    matchingEdges(grid[0][0]).includes(grid[0][0].left)
  ) {
    grid[0][0] = nextOrientation(grid[0][0])
  }
  // Set top row
  _.range(1, grid.length - 1).forEach((column) => {
    // Find next piece
    grid[0][column] = findPiece(groups, '3', grid[0][column - 1], 'right')
    // Orient next piece
    while (
      matchingEdges(grid[0][column]).includes(grid[0][column].top) ||
      grid[0][column].left !== grid[0][column - 1].right
    ) {
      grid[0][column] = nextOrientation(grid[0][column])
    }
  })
  // Set top right corner
  grid[0][grid.length - 1] = findPiece(groups, '2', grid[0][grid.length - 2], 'right')
  // Orient top right corner
  while (
    matchingEdges(grid[0][grid.length - 1]).includes(grid[0][grid.length - 1].top) ||
    matchingEdges(grid[0][grid.length - 1]).includes(grid[0][grid.length - 1].right) ||
    grid[0][grid.length - 1].left !== grid[0][grid.length - 2].right
  ) {
    grid[0][grid.length - 1] = nextOrientation(grid[0][grid.length - 1])
  }
}

const fillInMiddleRow = (grid, groups, rowNum) => {
  // Find left edge piece
  grid[rowNum][0] = findPiece(groups, '3', grid[rowNum - 1][0], 'bottom')
  // Rotate edge piece
  while (
    matchingEdges(grid[rowNum][0]).includes(grid[rowNum][0].left) ||
    grid[rowNum][0].top !== grid[rowNum - 1][0].bottom
  ) {
    grid[rowNum][0] = nextOrientation(grid[rowNum][0])
  }
  // Find middle pieces
  _.range(1, grid.length - 1).forEach((column) => {
    // Find next piece
    grid[rowNum][column] = findPiece(groups, '4', grid[rowNum][column - 1], 'right')
    // Orient next piece
    while (
      grid[rowNum][column].left !== grid[rowNum][column - 1].right ||
      grid[rowNum][column].top !== grid[rowNum - 1][column].bottom
    ) {
      grid[rowNum][column] = nextOrientation(grid[rowNum][column])
    }
  })
  // Find right edge piece
  grid[rowNum][grid.length - 1] = findPiece(groups, '3', grid[rowNum][grid.length - 2], 'right')
  // Orient right edge piece
  while (
    matchingEdges(grid[0][grid.length - 1]).includes(grid[0][grid.length - 1].right) ||
    grid[rowNum][grid.length - 1].left !== grid[rowNum][grid.length - 2].right ||
    grid[rowNum][grid.length - 1].top !== grid[rowNum - 1][grid.length - 1].bottom
  ) {
    grid[rowNum][grid.length - 1] = nextOrientation(grid[rowNum][grid.length - 1])
  }
}

const fillInBottomRow = (grid, groups) => {
  // Set bottom left corner
  grid[grid.length - 1][0] = findPiece(groups, '2', grid[grid.length - 2][0], 'bottom')
  // Rotate bottom left corner
  while (
    matchingEdges(grid[grid.length - 1][0]).includes(grid[grid.length - 1][0].bottom) ||
    matchingEdges(grid[grid.length - 1][0]).includes(grid[grid.length - 1][0].left) ||
    grid[grid.length - 1][0].top !== grid[grid.length - 2][0].bottom
  ) {
    grid[grid.length - 1][0] = nextOrientation(grid[grid.length - 1][0])
  }
  // Set bottom row
  _.range(1, grid.length - 1).forEach((column) => {
    // Find next piece
    grid[grid.length - 1][column] = findPiece(groups, '3', grid[grid.length - 1][column - 1], 'right')
    // Orient next piece
    while (
      matchingEdges(grid[grid.length - 1][column]).includes(grid[grid.length - 1][column].bottom) ||
      grid[grid.length - 1][column].left !== grid[grid.length - 1][column - 1].right
    ) {
      grid[grid.length - 1][column] = nextOrientation(grid[grid.length - 1][column])
    }
  })
  // Set bottom right corner
  grid[grid.length - 1][grid.length - 1] = findPiece(groups, '2', grid[grid.length - 1][grid.length - 2], 'right')
  // Orient bottom right corner
  while (
    matchingEdges(grid[grid.length - 1][grid.length - 1]).includes(grid[grid.length - 1][grid.length - 1].bottom) ||
    matchingEdges(grid[grid.length - 1][grid.length - 1]).includes(grid[grid.length - 1][grid.length - 1].right) ||
    grid[grid.length - 1][grid.length - 1].left !== grid[grid.length - 1][grid.length - 2].right
  ) {
    grid[grid.length - 1][grid.length - 1] = nextOrientation(grid[grid.length - 1][grid.length - 1])
  }
}

const matchingEdges = (tile) => {
  return _.flatMap(tile.possibleNeighbors, (neighbor) => neighbor.edges)
}

const neighborIds = (tile) => {
  return tile.possibleNeighbors.map((neighbor) => neighbor.id)
}

const findPiece = (groups, edges, neighbor, side) => {
  const index = groups[edges].findIndex((piece) => {
    return neighborIds(piece).includes(neighbor.id) && matchingEdges(piece).includes(neighbor[side])
  })
  return groups[edges].splice(index, 1)[0]
}

const nextOrientation = (tile, hops = 1) => {
  _.times(hops, () => {
    tile = rotate(tile)
    if ((tile.orientation + 1) % 4 === 0) {
      tile = flip(tile)
    }
    tile.orientation = (tile.orientation + 1) % 8
  })
  return tile
}

const rotate = (tile) => {
  return {
    id: tile.id,
    orientation: tile.orientation,
    top: tile.left.split('').reverse().join(''),
    left: tile.bottom,
    bottom: tile.right.split('').reverse().join(''),
    right: tile.top,
    content: tile.content,
    possibleEdges: tile.possibleEdges,
    possibleNeighbors: tile.possibleNeighbors,
  }
}

const flip = (tile) => {
  return {
    id: tile.id,
    orientation: tile.orientation,
    top: tile.top.split('').reverse().join(''),
    left: tile.right,
    bottom: tile.bottom.split('').reverse().join(''),
    right: tile.left,
    content: tile.content,
    possibleEdges: tile.possibleEdges,
    possibleNeighbors: tile.possibleNeighbors,
  }
}

const recreateImage = (grid) => {
  const trimmedGrid = grid.map((row) => {
    return row.map((tile) => {
      return trimContent(orientContent[tile.orientation](tile))
    })
  })
  const tileHeight = trimmedGrid[0][0].length
  return trimmedGrid.map((gridRow) => {
    return _.times(tileHeight, (tileRowNum) => {
      return _.range(gridRow.length).reduce((prev, gridColNum) => {
        return `${prev}${gridRow[gridColNum][tileRowNum]}`
      }, '')
    })
  }).flat()
}

const trimContent = (tile) => {
  return tile.slice(1, tile.length - 1).map((row) => {
    return row.substr(1, row.length - 2)
  })
}

const orientContent = [
  (tile) => tile.content,
  (tile) => {
    return _.range(tile.content.length).map((colNum) => {
      return _.reduceRight(tile.content, (prev, row) => (prev += row[colNum]), '')
    })
  },
  (tile) => {
    return _.map(tile.content, (row) => {
      return row.split('').reverse().join('')
    }).reverse()
  },
  (tile) => {
    return _.rangeRight(tile.content.length).map((colNum) => {
      return _.reduce(tile.content, (prev, row) => (prev += row[colNum]), '')
    })
  },
  (tile) => {
    return tile.content.map((row) => {
      return row.split('').reverse().join('')
    })
  },
  (tile) => {
    return _.rangeRight(tile.content.length).map((colNum) => {
      return _.reduceRight(tile.content, (prev, row) => (prev += row[colNum]), '')
    })
  },
  (tile) => _.map(tile.content, (row) => row).reverse(),
  (tile) => {
    return _.range(tile.content.length).map((colNum) => {
      return _.reduce(tile.content, (prev, row) => (prev += row[colNum]), '')
    })
  },
]

const lookForMonsters = (image) => {
  _.range(1, image.content.length - 1).forEach((rowNum) => {
    _.range(0, image.content.length - 19).forEach((colNum) => {
      checkSpotForMonster(image, rowNum, colNum)
    })
  })
}

const checkSpotForMonster = (image, r, c) => {
  if (image.content[r][c] === '.') return
  if (image.content[r + 1][c + 1] === '.') return
  if (image.content[r + 1][c + 4] === '.') return
  if (image.content[r][c + 5] === '.') return
  if (image.content[r][c + 6] === '.') return
  if (image.content[r + 1][c + 7] === '.') return
  if (image.content[r + 1][c + 10] === '.') return
  if (image.content[r][c + 11] === '.') return
  if (image.content[r][c + 12] === '.') return
  if (image.content[r + 1][c + 13] === '.') return
  if (image.content[r + 1][c + 16] === '.') return
  if (image.content[r][c + 17] === '.') return
  if (image.content[r][c + 18] === '.') return
  if (image.content[r - 1][c + 18] === '.') return
  if (image.content[r][c + 19] === '.') return
  image.content[r] = setCharAt(image.content[r], c, '0')
  image.content[r + 1] = setCharAt(image.content[r + 1], c + 1, '0')
  image.content[r + 1] = setCharAt(image.content[r + 1], c + 4, '0')
  image.content[r] = setCharAt(image.content[r], c + 5, '0')
  image.content[r] = setCharAt(image.content[r], c + 6, '0')
  image.content[r + 1] = setCharAt(image.content[r + 1], c + 7, '0')
  image.content[r + 1] = setCharAt(image.content[r + 1], c + 10, '0')
  image.content[r] = setCharAt(image.content[r], c + 11, '0')
  image.content[r] = setCharAt(image.content[r], c + 12, '0')
  image.content[r + 1] = setCharAt(image.content[r + 1], c + 13, '0')
  image.content[r + 1] = setCharAt(image.content[r + 1], c + 16, '0')
  image.content[r] = setCharAt(image.content[r], c + 17, '0')
  image.content[r] = setCharAt(image.content[r], c + 18, '0')
  image.content[r - 1] = setCharAt(image.content[r - 1], c + 18, '0')
  image.content[r] = setCharAt(image.content[r], c + 19, '0')
}

const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str
  return str.substring(0, index) + chr + str.substring(index + 1)
}

const hasMonster = (image) => {
  return image.content.some((row) => row.includes('0'))
}

const nextImageOrientation = (image, hops = 1) => {
  _.times(hops, () => {
    image = rotateImage(image)
    if ((image.orientation + 1) % 4 === 0) {
      image = flipImage(image)
    }
    image.orientation = (image.orientation + 1) % 8
  })
  return image
}

const rotateImage = (image) => {
  return {
    orientation: image.orientation,
    content: _.times(image.content.length, (colNum) => {
      return image.content.map((row) => row[colNum]).reverse().join('')
    }),
  }
}

const flipImage = (image) => {
  return {
    orientation: image.orientation,
    content: image.content.map((row) => row.split('').reverse().join('')),
  }
}

const countHashes = (image) => {
  return _.sumBy(image.content, (row) => {
    return _.sumBy(row.split(''), (chr) => chr === '#' ? 1 : 0)
  })
}

module.exports = { solve }
