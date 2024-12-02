import _ from 'lodash'

export const solve = (data) => {
  var puzzleTiles = new Map()
  var borderMatch = false

  puzzleTiles = parsePuzzleTiles(data)

  for(var x=0; x<puzzleTiles.length; x++) {
    borderMatch = false
    var puzzleTile1 = puzzleTiles[x]
    
    for(var y=x+1; y<puzzleTiles.length; y++) {
      borderMatch = false
      var puzzleTile2 = puzzleTiles[y]
      var borders1 = puzzleTile1.tileBorders
      var borders2 = puzzleTile2.tileBorders
      for(var a=0; a<borders1.length; a++) {
        for(var b=0; b<borders2.length; b++) {
          if(borders1[a] === borders2[b]) {
            puzzleTile1.matches.push({id: puzzleTile2.id, border: borders1[a]})
            puzzleTile2.matches.push({id: puzzleTile1.id, border: borders1[a]})
            borderMatch = true
            break
          }
        }
        if (borderMatch)
          break
      }
    }
  }

  var fourCornerIDs = 1
  puzzleTiles.forEach( tile => {
    if(tile.matches.length == 2) {
      console.log('corner id: ' + tile.id)
      fourCornerIDs *= tile.id
    }
  })
  console.log('Four Corner IDS is ' + fourCornerIDs)
}

const parsePuzzleTiles = (data) => {
  var tempArray = []
  var parsedTilesArray = []

  _.forEach(data, (line) => {
    if(line.startsWith('Tile')) {
      var lineElements = line.split(' ')
      id = lineElements[1].substring(0,lineElements[1].length-1)
    } 
    else if(line != '') {
      tempArray.push(line)
    }
    else {
      var topBorder = tempArray[0]
      var bottomBorder = tempArray[9]
      var leftBorder = ''
      var rightBorder = ''
      
      for(var i=0; i<tempArray.length; i++) {
        leftBorder += tempArray[i][0]
        rightBorder += tempArray[i][9]
      }

      tempArray = []
      tempArray.push(topBorder)
      tempArray.push(rightBorder)
      tempArray.push(bottomBorder)
      tempArray.push(leftBorder)

      tempArray = tempArray.concat(tempArray.map( border => reverseBorder(border)))
      parsedTilesArray.push({id: id, tileBorders: tempArray, matches:[],})
      tempArray = []
      id = ''
    }
  })

  return parsedTilesArray
}

const reverseBorder = (border) => {
  return border.split('').reverse().join('')
}
