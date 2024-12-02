import _ from 'lodash'

export const solve = (data) => {
  var departureTime = parseInt(data[0])
  var busIds = data[1].replace(/x,/g, '').trim()
  var earliestDepartureTime = 0
  var earliestBusId = 0  
  var calculatedTimes = calculateSchedule(departureTime, busIds.split(','))
  var minDiff = 10000000

  calculatedTimes.forEach((schedule) => {
    var busId = schedule[0]
    var busTimes = schedule[1]
    for(var i=0; i<busTimes.length; i++) {
      var diff = busTimes[i] - departureTime
      if(diff > 0 && diff < minDiff) {
          minDiff = diff
          earliestDepartureTime = busTimes[i]
          earliestBusId = busId
      }
    }
  })
  console.log(minDiff)
  console.log(earliestDepartureTime)
  console.log(earliestBusId)
  console.log((minDiff * earliestBusId))
}

const calculateSchedule = (departTime, busIds) => {
  return busIds.map((id) => {
    var intId = parseInt(id)
    var times = []
    var nextDepartTime = (Math.round(departTime/intId) * intId - intId)
    while(nextDepartTime < departTime) {
      times.push(nextDepartTime)
      nextDepartTime += intId
    }
    times.push(nextDepartTime)

    return [id, times]
  })
}