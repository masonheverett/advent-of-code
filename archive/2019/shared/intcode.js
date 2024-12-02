import _ from 'lodash'

export default ({ output = [], nextOutput = 0, data, nextMinus = 0, instructionPointer = -1, dataNdx = 0, relativeBase = 0 }, input) => {
  let usedInput = false
  while (true) {

    // Come back a few spots if necessary
    if (nextMinus > 0) {
      dataNdx -= nextMinus
      nextMinus = 0
    }

    // Jump somewhere else if necessary
    if (instructionPointer > -1) {
      dataNdx = instructionPointer
      instructionPointer = -1
    }

    // Get the next opcode
    let opcode = data[dataNdx]

    // halt if you find 99
    if (opcode === 99) {
      return {
        output,
        nextOutput,
        data,
        nextMinus,
        instructionPointer,
        dataNdx,
        relativeBase,
        needsInput: false,
      }
    }

    // Get the modes
    let [p1, p2, p3] = getModes(opcode)

    // Perform an action based on the opcode
    let shortOpcode = opcode % 10
    let val1, val2
    const get = getter(data)
    switch (shortOpcode) {

      // Add two values
      case 1:
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        val2 = p2 === 0 ? get(get(dataNdx + 2)) : p2 === 1 ? get(dataNdx + 2) : get(relativeBase + get(dataNdx + 2))
        if (p3 === 0) {
          data[get(dataNdx + 3)] = val1 + val2
        } else if (p3 === 1) {
          data[dataNdx + 3] = val1 + val2
        } else {
          data[relativeBase + get(dataNdx + 3)] = val1 + val2
        }
        break

      // Multiply two values
      case 2:
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        val2 = p2 === 0 ? get(get(dataNdx + 2)) : p2 === 1 ? get(dataNdx + 2) : get(relativeBase + get(dataNdx + 2))
        if (p3 === 0) {
          data[get(dataNdx + 3)] = val1 * val2
        } else if (p3 === 1) {
          data[dataNdx + 3] = val1 * val2
        } else {
          data[relativeBase + get(dataNdx + 3)] = val1 * val2
        }
        break

      // Store input
      case 3:
        if (usedInput) {
          // Get input by halting and returning current state
          return {
            output,
            nextOutput,
            data,
            nextMinus,
            instructionPointer,
            dataNdx,
            relativeBase,
            needsInput: true,
          }
        }
        usedInput = true
        if (p1 === 0) {
          data[get(dataNdx + 1)] = input;
        } else if (p1 === 1) {
          data[dataNdx + 1] = input
        } else {
          data[relativeBase + get(dataNdx + 1)] = input
        }
        nextMinus = 2
        break

      // Output a value
      case 4:
        // Really, just add the value to an output array that will be returned when you halt
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        output.push(val1)
        nextMinus = 2
        break

      // Jump if true
      case 5:
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        if (val1 !== 0) {
          instructionPointer = p2 === 0 ? get(get(dataNdx + 2)) : p2 === 1 ? get(dataNdx + 2) : get(relativeBase + get(dataNdx + 2))
        } else {
          nextMinus = 1
        }
        break

      // Jump if false
      case 6:
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        if (val1 === 0) {
          instructionPointer = p2 === 0 ? get(get(dataNdx + 2)) : p2 === 1 ? get(dataNdx + 2) : get(relativeBase + get(dataNdx + 2))
        } else {
          nextMinus = 1
        }
        break

      // Is less than
      case 7:
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        val2 = p2 === 0 ? get(get(dataNdx + 2)) : p2 === 1 ? get(dataNdx + 2) : get(relativeBase + get(dataNdx + 2))
        if (p3 === 0) {
          data[get(dataNdx + 3)] = val1 < val2 ? 1 : 0
        } else if (p3 === 1) {
          data[dataNdx + 3] = val1 < val2 ? 1 : 0
        } else {
          data[relativeBase + get(dataNdx + 3)] = val1 < val2 ? 1 : 0
        }
        break

      // Is equal
      case 8:
        val1 = p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        val2 = p2 === 0 ? get(get(dataNdx + 2)) : p2 === 1 ? get(dataNdx + 2) : get(relativeBase + get(dataNdx + 2))
        if (p3 === 0) {
          data[get(dataNdx + 3)] = val1 === val2 ? 1 : 0
        } else if (p3 === 1) {
          data[dataNdx + 3] = val1 === val2 ? 1 : 0
        } else {
          data[relativeBase + get(dataNdx + 3)] = val1 === val2 ? 1 : 0
        }
        break

      // Update relative base
      case 9:
        relativeBase += p1 === 0 ? get(get(dataNdx + 1)) : p1 === 1 ? get(dataNdx + 1) : get(relativeBase + get(dataNdx + 1))
        nextMinus = 2
        break
      default:
        break
    }

    // Jump 4 spots ahead
    dataNdx += 4
  }
}

const getModes = (opcode) => {
  return _.padStart(opcode.toString().substring(0, opcode.toString().length - 2), 3, '0').split('').reverse().map(Number)
}

// Safely get the value at ndx in arr, returning 0 if undefined
const getter = (arr) => (ndx) => {
  const value = arr[ndx]
  return value === undefined ? 0 : value
}
