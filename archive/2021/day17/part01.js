import _ from 'lodash'

export const solve = (data) => {
  var startCoord = { x:0, y:0}
  let targetArea = parseTargetArea(data[0])
  var maxY = 0
  var retY = 0

  for(let x=0; x<targetArea.xMax; x++) {
    for(let y=0; y<Math.abs(targetArea.yMin); y++) {
      var result = runVelocity({x:x, y:y}, targetArea)
      if(result.x != 1000 || result.y != 1000) { //overshot test
        if(result.maxY > maxY) maxY = result.maxY
      }
    }
  }
  console.log('Final maxY: ' + maxY)
}

const parseTargetArea = (data) => {
  var coords = data.split(',')
  var xIndex = coords[0].indexOf('x=')
  var yIndex = coords[1].indexOf('y=')
  var xCoords = coords[0].substring(xIndex+2, coords[0].length).split('..').map(Number)
  var yCoords = coords[1].substring(yIndex+2, coords[1].length).split('..').map(Number)
  
  return { xMin: xCoords[0], xMax: xCoords[1], yMin: yCoords[0], yMax: yCoords[1]}
}

const runVelocity = (initialVelocity, targetArea) => {
  var probeCoords = { x: 0, y: 0 }
  var mutatingVelocity = initialVelocity
  var maxY = 0

  for(let step = 0; step<500; step++) {
    if(probeCoords.y > maxY) maxY = probeCoords.y
    
    if(probeCoords.x != 0 && probeCoords.y != 0) {
      if(probeCoords.x >= targetArea.xMin && probeCoords.x <= targetArea.xMax && probeCoords.y >= targetArea.yMin && probeCoords.y <= targetArea.yMax) {
        //Hit target area!!
        //console.log(step)
        break
      }
      else if((probeCoords.x > targetArea.xMax)) {
        //console.log("overshot x on step: " + step)
        //console.log(probeCoords)
        maxY = -1
        probeCoords.x = -1000
        break
      }
      else if(probeCoords.y < targetArea.yMin)  {
        //console.log("overshot y on step: " + step)
        //console.log(probeCoords)
        maxY = -1
        probeCoords.y = -1000
        break
      }
    }

    probeCoords.x += mutatingVelocity.x
    probeCoords.y += mutatingVelocity.y

    if(mutatingVelocity.x != 0) {
      if(mutatingVelocity.x < 0) mutatingVelocity.x++
      else mutatingVelocity.x--
    }

    mutatingVelocity.y--
    //console.log('MutatingVelocity: ' + mutatingVelocity.x + ", " + mutatingVelocity.y)
    //console.log('ProbeCoords: ' + probeCoords.x + ", " + probeCoords.y)
  }
  //console.log('Final: ' + probeCoords.x + ", " + probeCoords.y)
  //console.log('MaxY: ' + maxY)
  return { x: probeCoords.x, y: probeCoords.y, maxY: maxY }
}