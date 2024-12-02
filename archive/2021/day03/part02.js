import _ from 'lodash'

export const solve = (data) => {
  let oxygenList = _.cloneDeep(data)
  for (let ndx = 0; ndx < data[0].length; ndx++) {
    oxygenList = trim(oxygenList, ndx, true)
    if (oxygenList.length === 1) {
      console.log(`Oxygen Generator Rating: ${oxygenList[0]}`)
      break
    }
  }

  let co2List = _.cloneDeep(data)
  for (let ndx = 0; ndx < data[0].length; ndx++) {
    co2List = trim(co2List, ndx, false)
    if (co2List.length === 1) {
      console.log(`CO2 Scrubber Rating: ${co2List[0]}`)
      break
    }
  }

  console.log(parseInt(oxygenList[0], 2) * parseInt(co2List[0], 2))
}

const trim = (data, bitPos, mostCommon) => {
  const zeros = []
  const ones = []

  for (let ndx = 0; ndx < data.length; ndx++) {
    if (data[ndx][bitPos] === '0') zeros.push(data[ndx])
    else ones.push(data[ndx])
  }

  if (mostCommon) {
    return ones.length >= zeros.length ? ones : zeros
  } else {
    return zeros.length <= ones.length ? zeros : ones
  }
}
