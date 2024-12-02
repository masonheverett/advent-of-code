import _ from 'lodash'

export const solve = (data) => {
  const parsedData = data[0].split(',').map(Number)
  console.log(_.max(findPermutations([5, 6, 7, 8, 9]).map(permutation => trySequenceOrder(parsedData, permutation))))
}

const trySequenceOrder = (data, order) => {
  // Initialize machine states and input buffers
  const machineStates = []
  const inputBuffers = []
  for (let i = 0; i < 5; ++i) {
    machineStates.push({
      output: [],
      nextOutput: 0,
      data: _.cloneDeep(data),
      nextMinus: 0,
      instructionPointer: -1,
      dataNdx: 0,
      needsInput: true,
    })
    inputBuffers[i] = [order[i]]
  }
  inputBuffers[0].push(0)

  // RUN IT
  let machineNdx = 0
  while (true) {
    // If a machine is done, skip it
    if (machineStates[machineNdx].needsInput) {
      // Run the machine until it halts or asks for input
      let newState = intcode(machineStates[machineNdx], inputBuffers[machineNdx].shift())
      // Return if we are done with the entire sequence
      if (!newState.needsInput && machineNdx === 4) {
        return _.last(newState.output)
      }
      // Take the output and add it to the buffer of the next machine
      for (let i = newState.nextOutput; i < newState.output.length; i++) {
        inputBuffers[(machineNdx + 1) % 5].push(newState.output[i])
        newState.nextOutput++
      }
      // Update the central state
      machineStates[machineNdx] = newState
    }
    // Increment loop counter
    machineNdx++
    machineNdx %= 5
  }
}

const intcode = ({ output, nextOutput, data, nextMinus, instructionPointer, dataNdx }, input) => {
  let usedInput = false
  while (true) {
    if (nextMinus > 0) {
      dataNdx -= nextMinus
      nextMinus = 0
    }
    if (instructionPointer > -1) {
      dataNdx = instructionPointer
      instructionPointer = -1
    }

    let opcode = data[dataNdx]
    let shortOpcode = opcode % 10
    let [p1, p2, p3] = parseOpcode(opcode)

    let val1, val2
    switch (shortOpcode) {
      case 1:
        val1 = p1 === 0 ? data[data[dataNdx + 1]] : data[dataNdx + 1]
        val2 = p2 === 0 ? data[data[dataNdx + 2]] : data[dataNdx + 2]
        if (p3 === 0) {
          data[data[dataNdx + 3]] = eval(val1) + eval(val2)
        } else {
          data[dataNdx + 3] = eval(val1) + eval(val2)
        }
        break
      case 2:
        val1 = p1 === 0 ? data[data[dataNdx + 1]] : data[dataNdx + 1]
        val2 = p2 === 0 ? data[data[dataNdx + 2]] : data[dataNdx + 2]
        if (p3 === 0) {
          data[data[dataNdx + 3]] = eval(val1) * eval(val2)
        } else {
          data[dataNdx + 3] = eval(val1) * eval(val2)
        }
        break
      case 3:
        if (usedInput) {
          return {
            output,
            nextOutput,
            data,
            nextMinus,
            instructionPointer,
            dataNdx,
            needsInput: true,
          }
        }
        usedInput = true
        if (p1 === 0) {
          data[data[dataNdx + 1]] = input;
        } else {
          data[dataNdx + 1] = input
        }
        nextMinus = 2
        break
      case 4:
        output.push(p1 === 0 ? data[data[dataNdx + 1]] : data[dataNdx + 1])
        nextMinus = 2
        break
      case 5:
        val1 = p1 === 0 ? eval(data[data[dataNdx + 1]]) : eval(data[dataNdx + 1])
        if (val1 !== 0) {
          instructionPointer = p2 === 0 ? eval(data[data[dataNdx + 2]]) : eval(data[dataNdx + 2])
        } else {
          nextMinus = 1
        }
        break
      case 6:
        val1 = p1 === 0 ? eval(data[data[dataNdx + 1]]) : eval(data[dataNdx + 1])
        if (val1 === 0) {
          instructionPointer = p2 === 0 ? eval(data[data[dataNdx + 2]]) : eval(data[dataNdx + 2])
        } else {
          nextMinus = 1
        }
        break
      case 7:
        val1 = p1 === 0 ? eval(data[data[dataNdx + 1]]) : eval(data[dataNdx + 1])
        val2 = p2 === 0 ? eval(data[data[dataNdx + 2]]) : eval(data[dataNdx + 2])
        data[data[dataNdx + 3]] = val1 < val2 ? 1 : 0
        break
      case 8:
        val1 = p1 === 0 ? eval(data[data[dataNdx + 1]]) : eval(data[dataNdx + 1])
        val2 = p2 === 0 ? eval(data[data[dataNdx + 2]]) : eval(data[dataNdx + 2])
        data[data[dataNdx + 3]] = val1 === val2 ? 1 : 0
        break
      case 9:
        return {
          output,
          nextOutput,
          data,
          nextMinus,
          instructionPointer,
          dataNdx,
          needsInput: false,
        }
      default:
        break
    }
    dataNdx += 4
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
