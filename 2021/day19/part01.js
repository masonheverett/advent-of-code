import _ from 'lodash'

const header = '--- scanner '
export const solve = (data) => {
  let scannersData = parseData(data)
  let baseScannerBeacons = Array.from(scannersData[0].scannerBeacons.keys()).map((coord) => {
    return coord.split(',').map(Number)
  })
  let baseScannerOffsets = new Map()
  let offsets = new Map()
  let offsetCount = 0

  for(let a=1; a<scannersData.length; a++) {
    let currentScannerBeacons = Array.from(scannersData[a].scannerBeacons.values())
    for(let i=0; i<baseScannerBeacons.length; i++) {
      for(let j=0; j<currentScannerBeacons.length; j++) {
        for(let k=0; k<currentScannerBeacons[j].length; k++) {
          var currentOffsetKey = getCoordinateOffset(baseScannerBeacons[i], currentScannerBeacons[j][k]).toString()
          if(offsets.has(currentOffsetKey)) {
            offsets.get(currentOffsetKey).add(currentScannerBeacons[j][0].toString())
          }
          else {
            var currentScannerMatch = new Set()
            currentScannerMatch.add(currentScannerBeacons[j][0].toString())
            offsets.set(currentOffsetKey, currentScannerMatch)
            
          }
          if(baseScannerOffsets.has(currentOffsetKey)) {
            baseScannerOffsets.get(currentOffsetKey).add(baseScannerBeacons[i].toString())
          }
          else {
            var baseScannerMatch = new Set()
            baseScannerMatch.add(baseScannerBeacons[i].toString())
            baseScannerOffsets.set(currentOffsetKey, baseScannerMatch)
          }
        }
      }
    }
    for (let [key, value] of offsets) {
      //console.log(key)
      if(value.size >= 12) {
        console.log('match')
        console.log(key)
        console.log(value)
        offsetCount += value.size
      }
    }

    for (let [key, value] of baseScannerOffsets) {
      //console.log(key)
      if(value.size >= 12) {
        console.log('victory')
        console.log(key)
        console.log(value)
        offsetCount += value.size
      }
    }
  }
  console.log(offsetCount)
}

const parseData = (data) => {
  var currentScanner = ''
  var scannerBeacons = new Map()
  var rotatedBeacons = []
  let scanners = []
  let angles = [0, 90, -90, 180, -180, 270, -270]
  _.forEach(data, line => {
    if(_.startsWith(line, header)) {
      var endIndex = line.lastIndexOf(' ---')
      currentScanner = line.substring(header.length,endIndex)
      scannerBeacons = new Map()
      rotatedBeacons = []
    }
    else if(line !== '') {
      var coords = _.split(line, ',').map(Number)
      rotatedBeacons.push(coords)
      _.forEach(angles, angle => {
        rotatedBeacons.push(rotateXaxis(coords, angle))
        rotatedBeacons.push(rotateYaxis(coords, angle))
        rotatedBeacons.push(rotateZaxis(coords, angle))
      })
      scannerBeacons.set(coords.toString(), rotatedBeacons)
      rotatedBeacons = []
    }
    else {
      scanners.push({
        scannerBeacons: scannerBeacons, 
      })
    }
  })
  return scanners
}

const getCoordinateOffset = (coord1, coord2) => {
  return [(coord1[0]-coord2[0]), (coord1[1]-coord2[1]), (coord1[2]-coord2[2])]
}

const rotateXaxis = (coords, angle) => {
  let rotationMultipliers = getRotationMultipliers(angle)
  let x = coords[0]
  let y = (coords[1] * rotationMultipliers[0]) - (coords[2] * rotationMultipliers[1])
  let z = (coords[1] * rotationMultipliers[1]) - (coords[2] * rotationMultipliers[0])
  
  return [x, y, z]
}

const rotateYaxis = (coords, angle) => {
  let rotationMultipliers = getRotationMultipliers(angle)
  let x = (coords[0] * rotationMultipliers[0]) - (coords[2] * rotationMultipliers[1])
  let y = coords[1]
  let z = (coords[2] * rotationMultipliers[0]) - (coords[0] * rotationMultipliers[1])
  
  return [x, y, z]
}

const rotateZaxis = (coords, angle) => {
  let rotationMultipliers = getRotationMultipliers(angle)
  let x = (coords[0] * rotationMultipliers[0]) - (coords[1] * rotationMultipliers[1])
  let y = (coords[0] * rotationMultipliers[1]) - (coords[1] * rotationMultipliers[0])
  let z = coords[2]
  
  return [x, y, z]
}

const getRotationMultipliers = (angle) => {
  if(angle == 90) {
    return [0, 1]
  }
  else if(angle == -90) {
    return [0, -1]
  }
  else if(angle == 180) {
    return [-1, 0]
  }
  else if(angle == -180) {
    return [-1, 0]
  }
  else if(angle == 270) {
    return [0, -1]
  }
  else if(angle == -270) {
    return [0, 1]
  }
  else if(angle == 0) {
    return [1, 0]
  }
  else {
    return [-100, -100]
  }
}