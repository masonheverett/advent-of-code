import _ from 'lodash'

export const solve = (data) => {
  var openChars = []
  var corruptLines = new Set()
  var bCorrupt = false
  console.log(data.length)
  _.forEach(data, line => {
    _.forEach(line, (ch, index) => {
      if(bCorrupt == false) {
        switch(ch) {
          case ')':
            if(openChars[openChars.length-1] == '(') {
              openChars.pop()
            }
            else {
              corruptLines.add({cLine: line, cChar: ch, eChar: openChars[openChars.length-1], synPoints: assignPoints(ch) })
              bCorrupt = true
            }
            break
          case ']':
            if(openChars[openChars.length-1] == '[') {
              openChars.pop()
            }
            else {
              corruptLines.add({cLine: line, cChar: ch, eChar: openChars[openChars.length-1], synPoints: assignPoints(ch)})
              bCorrupt = true
            }
            break
          case '}':
            if(openChars[openChars.length-1] == '{') {
              openChars.pop()
            }
            else {
              corruptLines.add({cLine: line, cChar: ch, eChar: openChars[openChars.length-1], synPoints: assignPoints(ch)})
              bCorrupt = true
            }
            break
          case '>':
            if(openChars[openChars.length-1] == '<') {
              openChars.pop()
            }
            else {
              corruptLines.add({cLine: line, cChar: ch, eChar: openChars[openChars.length-1], synPoints: assignPoints(ch)})
              bCorrupt = true
            }
            break
          default:
            openChars.push(ch)
            break
        }
      }
    })
    openChars = []
    bCorrupt = false
    //console.log(corruptLines)
  })

  var syntaxErrorScore = 0
  corruptLines.forEach(line => {
    syntaxErrorScore += line.synPoints
  })
  console.log(syntaxErrorScore)
}

const assignPoints = (cChar) => {
  if(cChar == ')') return 3
  if(cChar == ']') return 57
  if(cChar == '}') return 1197
  if(cChar == '>') return 25137
}
