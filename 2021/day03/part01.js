import _ from 'lodash'

export const solve = (data) => {
  var gamma = ''
  var epsilon = ''
  var decGamma = 0
  var decEpsilon = 0
  var zeroCount = 0
  var oneCount = 0
  var lineLength = data[0].length

  console.log('line length: ' + lineLength)
  for(var pos=0; pos<lineLength; pos++) {
    for(var line=0; line<data.length; line++) {
      var c = data[line].charAt(pos)
      c == '0' ? zeroCount++ : oneCount++
    }

    if(zeroCount > oneCount) {
      gamma += '0'
      epsilon += '1'
    }
    else {
      gamma += '1'
      epsilon += '0'
    }
    zeroCount = 0
    oneCount = 0
  }
  console.log('Gamma: ' + gamma);
  console.log('Epsilon: ' + epsilon);
  decGamma = parseInt(gamma, 2)
  decEpsilon = parseInt(epsilon, 2)
  console.log(decGamma * decEpsilon)
}
