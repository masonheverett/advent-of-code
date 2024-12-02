import _ from 'lodash'

export const solve = (data) => {
  var numericData = data[0].split(',').map(Number)

  for(var i=0; i<80; i++) {
    _.forEach(numericData, (number, index) => {
      if(number == 0) {
        numericData.push(8)
        numericData[index] = 6
      }
      else {
        numericData[index]--
      }
    })
  }
  console.log(numericData.length)
}
