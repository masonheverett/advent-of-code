const _ = require('lodash')

const activeCube = '#'

const solve = (data) => {
  var cycleMap = new Map()
  var totalActiveCubes = 0

  _.forEach(data, (row, y) => {
    _.forEach(row, (cube, x) => {
      var key = [x,y,0].join(',')
      cycleMap.set(key, (cube == activeCube))
    })
  })

  for(var cycle=0; cycle<6; cycle++) {
    var minX = 0
    var minY = 0
    var minZ = 0
    var maxX = 0
    var maxY = 0
    var maxZ = 0
    var cycleKeys = cycleMap.keys()
    var nextCycleMap = new Map()

    for(cycleKey of cycleKeys) {
      var aKey = cycleKey.split(',')
      var x = parseInt(aKey[0])
      var y = parseInt(aKey[1])
      var z = parseInt(aKey[2])
      if(x > maxX) {
        maxX = x
      }
      if(y > maxY) {
        maxY = y
      }
      if(z > maxZ) {
        maxZ = z
      }
      if(x < minX) {
        minX = x
      }
      if(y < minY) {
        minY = y
      }
      if(z < minZ) {
        minZ = z
      }
    }
   
    for(var x = minX-1; x <= maxX+1; x++) {
      for(var y = minY-1; y <= maxY+1; y++) {
        for(var z = minZ-1; z <= maxZ+1; z++) {
          var neighbors = getNeighbors(cycleMap, x,y,z)
          var activeNeighbors = neighbors.filter(val => val).length
          var key = [x,y,z].join(',')
          var isActive = false
          if(cycleMap.has(key)) {
            isActive = cycleMap.get(key)
          }
          if(!isActive && activeNeighbors == 3){
            nextCycleMap.set(key, true)
          }
          else if(isActive && activeNeighbors != 2 && activeNeighbors != 3) {
            nextCycleMap.set(key, false)
          }
          else {
            nextCycleMap.set(key, isActive)
          }
        }
      }
    }
    cycleMap = nextCycleMap
  }

  var cubes = cycleMap.values()
  for (var cubeState of cubes) {
    if(cubeState) {
      totalActiveCubes++
    }
  }

  console.log(totalActiveCubes)
}

const getNeighbors = (map, x,y,z) => {
  var neighbors = []
  for(var a = x-1; a <= x+1; a++) {
    for(var b = y-1; b <= y+1; b++) {
      for(var c = z-1; c <= z+1; c++) {
        if(a != x || b != y || c != z) {
          var key = [a,b,c].join(',')
          if(map.has(key)) {
            neighbors.push(map.get(key))
          }
          else {
            neighbors.push(false)
          }
        }
      }
    }
  }
  return neighbors
}

module.exports = { solve }
