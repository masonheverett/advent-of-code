const _ = require('lodash')

const solve = (data) => {
  console.log(_.max(findPermutations([0,1,2,3,4]).map(permutation => trySequenceOrder(data, permutation))))
}

const trySequenceOrder = (data, order) => {
  return order.reduce((lastOutput, nextSequence) => runProgram(data, [nextSequence, lastOutput]), 0)
}

const runProgram = (data, input) => {
  data = data[0].split(',').map(Number)
  let nextMinus = 0
  let instructionPointer = -1
  let inputNdx = 0

  for (let i = 0; i < data.length; i += 4) {
    if (nextMinus > 0) {
      i -= nextMinus
      nextMinus = 0
    }

    if (instructionPointer > -1) {
      i = instructionPointer
      instructionPointer = -1
    }

    let opcode = data[i]
    let shortOpcode = opcode % 10

    let [p1, p2, p3] = parseOpcode(opcode)

    let val1, val2
    switch (shortOpcode) {
      case 1:
        val1 = p1 === 0 ? data[data[i + 1]] : data[i + 1]
        val2 = p2 === 0 ? data[data[i + 2]] : data[i + 2]
        if (p3 === 0) {
          data[data[i + 3]] = eval(val1) + eval(val2)
        } else {
          data[i + 3] = eval(val1) + eval(val2)
        }
        break
      case 2:
        val1 = p1 === 0 ? data[data[i + 1]] : data[i + 1]
        val2 = p2 === 0 ? data[data[i + 2]] : data[i + 2]
        if (p3 === 0) {
          data[data[i + 3]] = eval(val1) * eval(val2)
        } else {
          data[i + 3] = eval(val1) * eval(val2)
        }
        break
      case 3:
        const answer = input[inputNdx]
        inputNdx++
        if (p1 === 0) {
          data[data[i + 1]] = answer;
        } else {
          data[i + 1] = answer
        }
        nextMinus = 2
        break
      case 4:
        return p1 === 0 ? data[data[i + 1]] : data[i + 1]
      case 5:
        val1 = p1 === 0 ? eval(data[data[i + 1]]) : eval(data[i + 1])
        if (val1 !== 0) {
          instructionPointer = p2 === 0 ? eval(data[data[i + 2]]) : eval(data[i + 2])
        } else {
          nextMinus = 1
        }
        break
      case 6:
        val1 = p1 === 0 ? eval(data[data[i + 1]]) : eval(data[i + 1])
        if (val1 === 0) {
          instructionPointer = p2 === 0 ? eval(data[data[i + 2]]) : eval(data[i + 2])
        } else {
          nextMinus = 1
        }
        break
      case 7:
        val1 = p1 === 0 ? eval(data[data[i + 1]]) : eval(data[i + 1])
        val2 = p2 === 0 ? eval(data[data[i + 2]]) : eval(data[i + 2])
        data[data[i + 3]] = val1 < val2 ? 1 : 0
        break
      case 8:
        val1 = p1 === 0 ? eval(data[data[i + 1]]) : eval(data[i + 1])
        val2 = p2 === 0 ? eval(data[data[i + 2]]) : eval(data[i + 2])
        data[data[i + 3]] = val1 === val2 ? 1 : 0
        break
      default:
        break
    }
  }
}

// https://stackoverflow.com/questions/9960908/permutations-in-javascript
const findPermutations = (inputArr) => {
  const result = []
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
     }
   }
 }
 permute(inputArr)
 return result
}

const parseOpcode = (opcode) => {
  if (eval(opcode) < 100) {
    // two digit opcode and a leading 0
    return [0, 0, 0]
  } else if (eval(opcode) < 119) {
    // two digit opcode and a leading 1
    return [1, 0, 0]
  } else if (eval(opcode) < 1019) {
    // three digit opcode and a leading 1 with a following 0
    return [0, 1, 0]
  } else if (eval(opcode) < 1119) {
    // three digit opcode and a leading 1 with a following 1
    return [1, 1, 0]
  } else if (eval(opcode) < 10019) {
    // four digit opcode and a leading 1 with a following two 0s
    return [0, 0, 1]
  } else if (eval(opcode) < 10119) {
    // four digit opcode and a leading 1 with a following 0 then 1
    return [1, 0, 1]
  } else if (eval(opcode) < 11119) {
    // four digit opcode and a leading 1 with a following two 1s
    return [1, 1, 1]
  }
}

module.exports = { solve }
