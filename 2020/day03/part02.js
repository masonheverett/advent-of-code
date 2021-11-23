import _ from 'lodash'

export const solve = (data) => {
  var count1 = 0
  var count3 = 0
  var count5 = 0
  var count7 = 0
  var count2 = 0
  const width = data[0].length
  for (i = 1; i < data.length; i++) {
    const x1 = i % width
    const x3 = (3 * i) % width
    const x5 = (5 * i) % width
    const x7 = (7 * i) % width
    if (data[i][x1] === '#')
      count1++;
    if (data[i][x3] === '#')
      count3++;
    if (data[i][x5] === '#')
      count5++;
    if (data[i][x7] === '#')
      count7++;
    if (i < data.length / 2 && data[2 * i][x1] === '#')
      count2++;
  }
  const out = count1 * count3 * count5 * count7 * count2
  console.log(count1 + " * " + count3 + " * " + count5 + " * " + count7 + " * " + count2 + " = " + out)
}
