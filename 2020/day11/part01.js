const _ = require('lodash')

const emptySeat = 'L'
const occupiedSeat = '#'
const floor = '.'

const solve = (data) => {
  var newRows = processSeating(data)
  for(var i=0; i<newRows.length; i++) {
    console.log(newRows[i])
  }
}

const processSeating = (seatingData) => {
  var totalRows = seatingData.length
  var transformedRows = []
  for(var i=0; i<totalRows; i++) {
    console.log('Input row: ' + i + ": " + seatingData[i])
    if(i == 0) {
      transformedRows.push(processRow(seatingData[i], seatingData[i].length, null, seatingData[i+1]))
    }
    else if(i == totalRows-1) {
      transformedRows.push(processRow(seatingData[i], seatingData[i].length, seatingData[i-1], null))
    }
    else {
      transformedRows.push(processRow(seatingData[i], seatingData[i].length, seatingData[i-1], seatingData[i+1]))
    }
    console.log('Output seatingData ' + i + ': ' + transformedRows[i])
  }

  return transformedRows
}

const processRow = (row, rowLength, rowAbove, rowBelow) => {
  for(var i=0; i<rowLength; i++) {
    if(i == 0) {
      if(row[i] == emptySeat) {
        var adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow, i, 2)
        if(row[i+1] == occupiedSeat) {adjacentOccupiedCount++}
        if(adjacentOccupiedCount == 0) {
          row = charReplace(row, occupiedSeat, i)
        }
      }
      else if(row[i] == occupiedSeat) {
        var adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow,i,2)
        if(row[i+1] == occupiedSeat) { adjacentOccupiedCount++ }
        if(adjacentOccupiedCount >= 4) {
          row = charReplace(row, emptySeat, i)
        }
      }
    }
    else if(i == rowLength-1) {
      if(row[i] == emptySeat) {
        var adjacentOccupiedCount = getAdjacentOccupiedCountEndOfRow(rowAbove, rowBelow, i, 2)
        if(row[i-1] == emptySeat) {adjacentOccupiedCount++}
        if(adjacentOccupiedCount == 0) {
          row = charReplace(row, occupiedSeat, i)
        }
      }
      else if(row[i] == occupiedSeat) {
        var adjacentOccupiedCount = getAdjacentOccupiedCountEndOfRow(rowAbove, rowBelow,i,2)
        if(row[i-1] == occupiedSeat) { adjacentOccupiedCount++ }
        if(adjacentOccupiedCount >= 4) {
          row = charReplace(row, emptySeat, i)
        }
      }
    }
    else if(row[i] == emptySeat) {
      var adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow, i-1, 3)
      if(row[i-1] == occupiedSeat) { adjacentOccupiedCount++}
      if(row[i+1] == occupiedSeat) { adjacentOccupiedCount++}
      
      if(adjacentOccupiedCount == 0) 
        row = charReplace(row, occupiedSeat, i)
    }
    else if(row[i] == occupiedSeat) {
      var adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow, i-1, 3)
      if(row[i-1] == occupiedSeat) { adjacentOccupiedCount++}
      if(row[i+1] == occupiedSeat) { adjacentOccupiedCount++}
      if(adjacentOccupiedCount >= 4) {
        row = charReplace(row, emptySeat, i)
      }
    }
  }

  return row
}

const getAdjacentOccupiedCount = (row1, row2, index, max) => {
  var occupiedCount = 0
  for(var i=index; i<max; i++) {
    if(row1 !== null && row1[i] == occupiedSeat) { occupiedCount++ }
    if(row2 !== null && row2[i] == occupiedSeat) { occupiedCount++ }
  }
  return occupiedCount
}

const getAdjacentOccupiedCountEndOfRow = (row1, row2, index, max) => {
  var occupiedCount = 0
  for(var i=0; i<max; i++) {
    if(row1 !== null && row1[index-i] == occupiedSeat) { occupiedCount++ }
    if(row2 !== null && row2[index-i] == occupiedSeat) { occupiedCount++ }
  }
  return occupiedCount
}

const charReplace = (inStr, char, index) => {
  var outStr = inStr.split('');
  outStr[index] = char
  outStr = outStr.join('')

  return outStr
}

module.exports = { solve }
