import _ from 'lodash'

export const solve = (data) => {
  const outputValues = []
  var count = 0;
  
  _.forEach(data, line => {
    outputValues.push(getOutputValues(line))
  })

  _.forEach(outputValues, digitSequence => {
    _.forEach(digitSequence, sequence => {
      if(doesOutputMatchUnique(sequence)) {
        count++
      }
    })
  })
  
  console.log(count)
}

const getOutputValues = (line) => {
  var pipeIndex = line.indexOf('|')
  var output = line.slice(pipeIndex+2).split(' ')
  return output
}

const doesOutputMatchUnique = (s) => {
  if(s.length == 2 || s.length == 4 || s.length == 3 || s.length == 7) return true
  return false
}
