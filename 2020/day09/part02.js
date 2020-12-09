const _ = require('lodash')

const solve = (data) => {
  var firstInvalid = 0
  var valueSetSize = 25;
  var invalidValueIndex = 0;
  
  for (var i = valueSetSize; i < data.length; i++) {
    var valueSet = data.slice(i-valueSetSize, i)
    if(!isValid(parseInt(data[i]), valueSet)) {
      invalidValueIndex = i
      firstInvalid = data[i]
      break
    }
  }
  
  console.log('First Invalid: ' + firstInvalid)
  console.log('First Invalid Index: ' + invalidValueIndex)
  var calculatedValue = calculateValue(firstInvalid, data, invalidValueIndex)

  console.log(calculatedValue)
}

const calculateValue = (invalidValue, data, invalidValueIndex) => {
  var startIndex = 0;
  var endIndex = 0;
  var done = false
  for(var i=0; i<invalidValueIndex; i++) {
    var contiguousSum = 0;
    for (var j=i; j<invalidValueIndex && !done; j++) {
      contiguousSum += parseInt(data[j])
      if (contiguousSum == invalidValue) {
        startIndex = i
        endIndex = j
        done = true
      }
      else if(contiguousSum > invalidValue) {
        break
      }
    }
  }

  var validRange = data.slice(startIndex, endIndex)
  var min = Math.min(...validRange)
  var max = Math.max(...validRange)
  
  return (min + max)
}

const isValid = (value, valueSet) => {
  var min = Math.min(...valueSet)
  var max = Math.max(...valueSet)
  var found = false

  if(value < min || value > (max + max)) {
    return false
  }

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
