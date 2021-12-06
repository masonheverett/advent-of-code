import _ from 'lodash'

export const solve = (data) => {
  const numericData = data[0].split(',').map(Number)
  var buckets = parseData(numericData)

  for(var i=0; i<256; i++) {
    const temp = buckets[0]
    for (var j=0; j<8; j++) {
      buckets[j] = buckets[j + 1]
    }
    buckets[8] = temp
    buckets[6] += temp
  }
  console.log(_.sum(buckets))
}

const parseData = (data) => {
  var buckets = _.times(9, _.constant(0))
  _.forEach(data, (fish) => {
    buckets[fish]++
  })
  return buckets
}
