const _ = require('lodash')

const solve = (data) => {
  var firstInvalid = 0
  
  for (var i = 25; i < data.length; i++) {
    var valueSet = data.slice(i-25, i)
    if(!isValid(parseInt(data[i]), valueSet)) {
      firstInvalid = data[i]
      break
    }
  }
  console.log(firstInvalid)
}

const isValid = (value, valueSet) => {
  var min = Math.min(...valueSet)
  var max = Math.max(...valueSet)
  var found = false

  if(value < min || value > (max + max))
    return false

  for(var i=0; i<valueSet.length; i++) {
    var testValue = value - valueSet[i]
    if(testValue > 0 && testValue != valueSet[i]) {
      var findResult = valueSet.find(element => element == testValue)
      
      if(findResult > 0) {
        found = true
        break
      }
    }
  }
  
  return found
}

module.exports = { solve }
