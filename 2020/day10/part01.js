const _ = require('lodash')

const solve = (data) => {
  var answer = 0
  var oneJoltDiffs = 0
  var threeJoltDiffs = 0

  var parsedData = parse(data)

  // Account for charging outlet to first adapter
  if(parsedData[0] == 1) {
    oneJoltDiffs++
  }
  else if(parsedData[0] == 3) {
    threeJoltDiffs++
  }

  // Cycle through the rest of the sorted array
  for(var i=0; i<parsedData.length; i++) {
    var diff = 0
    if(i+1 != parsedData.length) {
      diff = parsedData[i+1] - parsedData[i]
    }
      
    if(diff == 1) {
      oneJoltDiffs++
    }
    else if(diff == 3) {
      threeJoltDiffs++
    }
  }

  answer = oneJoltDiffs * threeJoltDiffs
  console.log(answer)
}

const parse = (data) => {
  var convertedArray = data.map((num) => {
    const numberValue = parseInt(num)
    return numberValue
  })

  convertedArray.sort((a, b) => a - b)
  convertedArray.push((convertedArray[convertedArray.length-1])+3)

  return convertedArray
}

module.exports = { solve }
