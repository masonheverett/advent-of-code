const _ = require('lodash')

const emptySeat = 'L'
const occupiedSeat = '#'
const floor = '.'

const solve = (data) => {
  var roomState = data
  var currentState = null
  var changes = 1

  while(changes != 0) {
    currentState = processSeating(roomState)
    roomState = currentState[0]
    changes = currentState[1]
  }

  var occupiedCount = 0;
  for(var i=0; i<roomState.length; i++) {
    var lineSplit = roomState[i].split('#')
    occupiedCount += lineSplit.length - 1
  }
  console.log('Occupied Count: ' + occupiedCount)
}

const processSeating = (seatingData) => {
  var linesChanged = 0
  var totalRows = seatingData.length
  var transformedRows = []
  for(var i=0; i<totalRows; i++) {
    var outputRow = ''
    if(i == 0) {
      outputRow = processRow(seatingData[i], seatingData[i].length, null, seatingData[i+1])
    }
    else if(i == totalRows-1) {
      outputRow = processRow(seatingData[i], seatingData[i].length, seatingData[i-1], null)
    }
    else {
      outputRow = processRow(seatingData[i], seatingData[i].length, seatingData[i-1], seatingData[i+1])
    }

    if (seatingData[i] != outputRow) {
      linesChanged++
    }
    transformedRows.push(outputRow)
  }
  
  return [transformedRows, linesChanged]
}

const processRow = (row, rowLength, rowAbove, rowBelow) => {
  var outputRow = ""
  var adjacentOccupiedCount = 0
  for(var i=0; i<rowLength; i++) {
    if(i == 0) {
      if(row[i] == emptySeat) {
        adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow, i, 2)
        if(row[i+1] == occupiedSeat) {adjacentOccupiedCount++}
        if(adjacentOccupiedCount == 0) {
          outputRow += occupiedSeat
        }
        else {
          outputRow += emptySeat
        }
        
      }
      else if(row[i] == occupiedSeat) {
        adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow,i,2)
        if(row[i+1] == occupiedSeat) { adjacentOccupiedCount++ }
        if(adjacentOccupiedCount >= 4) {
          outputRow += emptySeat
        }
        else {
          outputRow += occupiedSeat
        }
      }
      else {
        outputRow += floor
      }
    }
    else if(i == rowLength-1) {
      if(row[i] == emptySeat) {
        adjacentOccupiedCount = getAdjacentOccupiedCountEndOfRow(rowAbove, rowBelow, i, 2)
        if(row[i-1] == occupiedSeat) {adjacentOccupiedCount++}
        if(adjacentOccupiedCount == 0) {
          outputRow += occupiedSeat
        }
        else {
          outputRow += emptySeat
        }
      }
      else if(row[i] == occupiedSeat) {
        adjacentOccupiedCount = getAdjacentOccupiedCountEndOfRow(rowAbove, rowBelow,i,2)
        if(row[i-1] == occupiedSeat) { adjacentOccupiedCount++ }
        if(adjacentOccupiedCount >= 4) {
          outputRow += emptySeat
        }
        else {
          outputRow += occupiedSeat
        }
      }
      else {
        outputRow += floor
      }
    }
    else if(row[i] == emptySeat) {
      adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow, i-1, i+2)
      if(row[i-1] == occupiedSeat) { adjacentOccupiedCount++}
      if(row[i+1] == occupiedSeat) { adjacentOccupiedCount++}
      
      if(adjacentOccupiedCount == 0) 
        outputRow += occupiedSeat
      else 
        outputRow += emptySeat
    }
    else if(row[i] == occupiedSeat) {
      adjacentOccupiedCount = getAdjacentOccupiedCount(rowAbove, rowBelow, i-1, i+2)
      if(row[i-1] == occupiedSeat) { adjacentOccupiedCount++}
      if(row[i+1] == occupiedSeat) { adjacentOccupiedCount++}
      if(adjacentOccupiedCount >= 4) {
        outputRow += emptySeat
      }
      else {
        outputRow += occupiedSeat
      }
    }
    else if(row[i] == floor) {
      outputRow += floor
    }
  }

  return outputRow
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

module.exports = { solve }
