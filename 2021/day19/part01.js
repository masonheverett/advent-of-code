import _ from 'lodash'

const header = '--- scanner '
export const solve = (data) => {
  let scannerOverlaps = []
  let mappedBeacons = []
  let scannersData = parseData(data)

  mappedBeacons = _.concat(mappedBeacons, Array.from(scannersData[0].scannerBeacons.keys()).map((coord) => {
    return coord.split(',').map(Number)
  }))

  for(let i=0; i<scannersData.length; i++) {
    var scannerOverlap = getScannerBeaconOverlaps(scannersData[i], scannersData)
    console.log(scannerOverlap)
    /* for(let j=0; j<scannerOverlap.length; j++) {
      if(scannerOverlap[j].originScannerID < scannerOverlap[j].scannerID) {
        console.log(scannerOverlap[j])
        // Need to calculate scanner origin per scanner 0 coordinate system and then apply to all coordinates
        var test = normalizeOverlapCoordinates(scannerOverlap[j])
        console.log('test')
        console.log(test)
        mappedBeacons = _.concat(mappedBeacons,test)
      }
    }*/
    //scannerOverlaps.push(getScannerBeaconOverlaps(scannersData[i], scannersData))
  }

  console.log(mappedBeacons)
  console.log(mappedBeacons.length)
}

const parseData = (data) => {
  var currentScanner = ''
  var scannerBeacons = new Map()
  var rotatedBeacons = []
  let scanners = []
  let angles = [0, 90, -90, 180, -180, 270, -270, 360]
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
      if(currentScanner != 0) {
      for(let i=0; i<24; i++) {
        rotatedBeacons.push(generateRotationCoords(coords, i))
      }
      /* _.forEach(angles, angle => {
        rotatedBeacons.push(rotateXaxis(coords, angle))
        rotatedBeacons.push(rotateYaxis(coords, angle))
        rotatedBeacons.push(rotateZaxis(coords, angle))
      })*/
    }
      scannerBeacons.set(coords.toString(), rotatedBeacons)
      rotatedBeacons = []
    }
    else {
      scanners.push({
        scannerID: parseInt(currentScanner,10),
        scannerLocation: [],
        scannerMapped: false,
        scannerBeacons: scannerBeacons, 
      })
    }
  })
  return scanners
}

const getScannerBeaconOverlaps = (scanner, listOfScanners) => {
  let scannerID = scanner.scannerID
  let scannerBeacons = Array.from(scanner.scannerBeacons.keys()).map((coord) => {
    return coord.split(',').map(Number)
  })
  let scannerBeaconOverlaps = []

  for(let scanIndex=0; scanIndex<listOfScanners.length; scanIndex++) {
    let currentScanner = listOfScanners[scanIndex]
    let currentScannerBeacons = Array.from(currentScanner.scannerBeacons.values())

    if(scannerID != currentScanner.scannerID) {
      let overlaps = {originScannerID: scannerID, scannerID: currentScanner.scannerID, candidateBeacons: new Map() }
      overlaps.scannerID = currentScanner.scannerID
      //console.log('CurrentScanner: ' + currentScanner.scannerID)
      //console.log(scannerBeacons.length)
      //console.log(currentScannerBeacons.length)
      for(let i=0; i<scannerBeacons.length; i++) {
        for(let j=0; j<currentScannerBeacons.length; j++) {
          for(let k=0; k<currentScannerBeacons[j].length; k++) {
            var coordinateDelta = coordinateSubtract(scannerBeacons[i], currentScannerBeacons[j][k]).toString()
            if(overlaps.candidateBeacons.has(coordinateDelta)) {
              overlaps.candidateBeacons.get(coordinateDelta).add(currentScannerBeacons[j][k].toString())
            }
            else {
              var beaconCoordinate = new Set()
              beaconCoordinate.add(currentScannerBeacons[j][k].toString())
              overlaps.candidateBeacons.set(coordinateDelta, beaconCoordinate)
              
            }
          }
        }
      }

      for (let [key, value] of overlaps.candidateBeacons) {
        //console.log(value.size)
        if(value.size >= 12) {
          console.log('candidateBeacons size: ' + value.size)
          //console.log('overlaps scanner ID: ' + overlaps.scannerID)
          //console.log('beacon size: ' + value.size)
          var deltaScannerOrigin = _.split(key, ',').map(Number)
          var newBeacons = Array.from(value).map((coord) => {
            return coord.split(',').map(Number)
          })
          scannerBeaconOverlaps.push({originScannerID: overlaps.originScannerID, scannerID: overlaps.scannerID, origin: deltaScannerOrigin, beacons: newBeacons})
        }
      }
    }
  }
  //console.log("== scanner overlap summary ==")
  //console.log(scannerBeaconOverlaps)
  return scannerBeaconOverlaps
}

const normalizeOverlapCoordinates = (scannerOverlap) => {
  var beacons = scannerOverlap.beacons
  var delta = scannerOverlap.origin
  var beaconCoordinates = []
  for(let i=0; i<beacons.length; i++) {
    beaconCoordinates.push(coordinateAdd(delta, beacons[i]))
  }
  console.log(beaconCoordinates.length)
  return beaconCoordinates
}

const normalizeScannerCoordinates = (scanner, scannerOverlap) => {
  let scannerBeacons = Array.from(scanner.scannerBeacons.keys()).map((coord) => {
    return coord.split(',').map(Number)
  })
  let delta = scannerOverlap.origin
  let mappedBeacons = []
  let normalizedBeacons = new Map()

  for(let i=0; i<scannerBeacons.length; i++) {
    var coords = coordinateAdd(delta, scannerBeacons[i])
    mappedBeacons.push(coords)
    for(let j=0; j<24; j++) {
      mappedBeacons.push(generateRotationCoords(coords, j))
    }
    normalizedBeacons.set(coords.toString(), mappedBeacons)
  }
  scanner.scannerBeacons = normalizedBeacons

  return scanner
}

const coordinateSubtract = (coord1, coord2) => {
  return [(coord1[0]-coord2[0]), (coord1[1]-coord2[1]), (coord1[2]-coord2[2])]
}

const coordinateAdd = (coord1, coord2) => {
  return [(coord1[0]+coord2[0]), (coord1[1]+coord2[1]), (coord1[2]+coord2[2])]
}

const generateRotationCoords = (coord, id) => {
  // Hardcoded results per matrix data from this source -- https://www.euclideanspace.com/maths/algebra/matrix/transforms/examples/index.htm
  switch(id) {
    case 0:
      return coord
    case 1: 
      return [coord[0], -coord[2], coord[1]]
    case 2:
      return [coord[0], -coord[1], -coord[2]]
    case 3:
      return [coord[0], coord[2], -coord[1]]
    case 4:
      return [-coord[0], -coord[1], coord[2]]
    case 5:
      return [-coord[0], -coord[2], -coord[1]]
    case 6:
      return [-coord[0], coord[1], -coord[2]]
    case 7:
      return [-coord[0], coord[2], coord[1]]
    case 8: 
      return [coord[1], coord[0], -coord[2]]
    case 9: 
      return [coord[1], -coord[0], coord[2]]
    case 10: 
      return [coord[1], coord[2], coord[0]]
    case 11:
      return [coord[1], -coord[2], -coord[0]]
    case 12:
      return [-coord[1], coord[0], coord[2]]
    case 13:
      return [-coord[1], -coord[0], -coord[2]]
    case 14:
      return [-coord[1], -coord[2], coord[0]]
    case 15:
      return [-coord[1], coord[2], -coord[0]]
    case 16:
      return [coord[2], coord[0], coord[1]]
    case 17:
      return [coord[2], -coord[0], -coord[1]]
    case 18:
      return [coord[2], -coord[1], coord[0]]
    case 19:
      return [coord[2], coord[1], -coord[0]]
    case 20:
      return [-coord[2], coord[0], -coord[1]]
    case 21:
      return [-coord[2], -coord[0], coord[1]]
    case 22:
      return [-coord[2], coord[1], coord[0]]
    case 23:
      return [-coord[2], -coord[1], -coord[0]]
    default:
      return [-100, -100, -100]
  }
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
  else if(angle == 0 || angle == 360) {
    return [1, 0]
  }
  else {
    return [-100, -100]
  }
}

/* 

  let scannerOgetScannerBeaconOverlaps = (scanner, listOfScanners)
  let scannersDataCopy = scannersData
  //console.log(scannersData[0])
  let deltaCount = 0
  let finalScanners = []

  for(let dataIndex=0; dataIndex<scannersData.length; dataIndex++) {
    let baseScanner = scannersDataCopy[dataIndex]
    let baseScannerBeacons = Array.from(baseScanner.scannerBeacons.keys()).map((coord) => {
      return coord.split(',').map(Number)
    })
    console.log(baseScanner.scannerID)
    //let baseScannerDeltas = new Map()
    
    //console.log(scannersDataCopy[0])
    //let currentScannerBeacons = Array.from(scannersData[dataIndex].scannerBeacons.values())
    for(let h=1; h<scannersDataCopy.length; h++) {
      //console.log(scannersDataCopy.length)
      if(h != dataIndex) {
      let currentScanner = scannersDataCopy[h]
      let currentScannerBeacons = Array.from(currentScanner.scannerBeacons.values())
      let deltas = {scannerID: currentScanner.scannerID, data: new Map() }
      console.log('CurrentScanner: ' + scannersDataCopy[h].scannerID)
      deltas.scannerID = scannersDataCopy[h].scannerID
      console.log(baseScanner.scannerID)
      console.log(currentScanner.scannerID)
      console.log(baseScannerBeacons.length)
      console.log(currentScannerBeacons.length)
    for(let i=0; i<baseScannerBeacons.length; i++) {
      for(let j=0; j<currentScannerBeacons.length; j++) {
        for(let k=0; k<currentScannerBeacons[j].length; k++) {
          var currentOffsetKey = getCoordinateDelta(baseScannerBeacons[i], currentScannerBeacons[j][k]).toString()
          if(deltas.data.has(currentOffsetKey)) {
            deltas.data.get(currentOffsetKey).add(currentScannerBeacons[j][k].toString())
          }
          else {
            var currentScannerMatch = new Set()
            currentScannerMatch.add(currentScannerBeacons[j][k].toString())
            deltas.data.set(currentOffsetKey, currentScannerMatch)
            
          }
          /* if(baseScannerDeltas.has(currentOffsetKey)) {
            baseScannerDeltas.get(currentOffsetKey).add(baseScannerBeacons[i].toString())
          }
          else {
            var baseScannerMatch = new Set()
            baseScannerMatch.add(baseScannerBeacons[i].toString())
            baseScannerDeltas.set(currentOffsetKey, baseScannerMatch)
          }*/
/*        }
      }
    }
    for (let [key, value] of deltas.data) {
      //console.log(value.size)
      if(value.size >= 12) {
        console.log('delta match: ' + deltas.scannerID)
        console.log('size: ' + value.size)
        var deltaScannerOrigin = _.split(key, ',').map(Number)
        var newBeacons = Array.from(value).map((coord) => {
          return coord.split(',').map(Number)
        })
        newBeacons = translateCoordinates(deltaScannerOrigin, newBeacons)
        console.log(newBeacons)
        //baseScannerBeacons = _.concat(baseScannerBeacons, newBeacons)
        if(dataIndex == 0) {
          finalScanners = _.concat(finalScanners, baseScannerBeacons)
        }
        finalScanners = _.concat(finalScanners, newBeacons)
        //finalScanners.push({scannerID: deltas.scannerID, scannerLocation: key, beaconSet: value})
        console.log(key)
        console.log(value)
        //console.log(baseScannerBeacons)

        //deltaCount += value.size
      }
    }
  }
  
  }

    //for (let [key, value] of baseScannerDeltas) {
      //console.log(key)
      //if(value.size >= 12) {
        //console.log('match ' + baseScanner.scannerID)
        //console.log(key)
        //console.log(value)
        //_.concat(baseScannerBeacons,Array.from(value))
        //deltaCount += value.size
        /* if(baseScanner.scannerID == 0) {
          finalScanners.push({scannerID: '0', scannerLocation: [0,0,0], beaconSet: value})
          //console.log(key)
          //console.log(value)
        }
        else {
          finalScanners.push({scannerID: baseScanner.scannerID, scannerLocation: key, beaconSet: value})
          //console.log(key)
          //console.log(value)
        }*/
      //}
    //}

    
  /*}
  console.log(finalScanners.length)*/
  //console.log(finalScanners)
  //console.log(offsetCount)