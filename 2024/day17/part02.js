import _ from 'lodash'

class Machine {
  constructor(data) {
    this.program = data[4].split(' ')[1].split(',').map(char => _.toNumber(char))
    this.regA = BigInt(data[0].split(' ')[2])
    this.regB = BigInt(data[1].split(' ')[2])
    this.regC = BigInt(data[2].split(' ')[2])
    this.inPtr = 0
    this.out = []
  }

  opcodeFns(opcode) {
    return {
      '0': operand => this.regA = this.regA / (2n ** this.combos(operand)),
      '1': operand => this.regB = this.regB ^ BigInt(operand),
      '2': operand => this.regB = this.combos(operand) % 8n,
      '3': operand => this.inPtr = this.regA === 0n ? this.inPtr : operand,
      '4': operand => this.regB = this.regB ^ this.regC,
      '5': operand => this.out.push(this.combos(operand) % 8n),
      '6': operand => this.regB = this.regA / (2n ** this.combos(operand)),
      '7': operand => this.regC = this.regA / (2n ** this.combos(operand))
    }[opcode]
  }

  combos(operand) {
    return {
      '0': 0n,
      '1': 1n,
      '2': 2n,
      '3': 3n,
      '4': this.regA,
      '5': this.regB,
      '6': this.regC
    }[operand]
  }

  executeNext() {
    // Halt and return false to indicate you are at the end
    if (this.inPtr > this.program.length - 2) return false
    // Read opcode and operand
    const opcode = this.program[this.inPtr]
    const operand = this.program[this.inPtr + 1]
    // Note current instruction pointer
    const currentInPtr = this.inPtr
    // Execute operation
    this.opcodeFns(opcode)(operand)
    // Advance instruction pointer unless it has already moved
    if (currentInPtr === this.inPtr) this.inPtr += 2
    // Return true to indicate you can still run
    return true
  }

  executeFull() {
    while (this.executeNext()) {}
  }

  reset(a, b, c) {
    this.regA = a
    this.regB = b
    this.regC = c
    this.inPtr = 0
    this.out = []
  }

  printInfo() {
    console.log('----- MACHINE INFO -----')
    console.log('Registers:', this.regA, this.regB, this.regC)
    console.log('Instruction Pointer:', this.inPtr)
    console.log('Program:', this.program.join(','))
    console.log('Output:', this.output())
    console.log('------------------------')
  }

  output() {
    return this.out.join(',')
  }
}

export const solve = (data) => {
  const machine = new Machine(data)
  console.log(_.min(findPrograms(machine, 0, 0n, machine.regB, machine.regC)))
}

const findPrograms = (machine, currentIndex, soFar, regB, regC) => {
  // You found one!
  if (currentIndex >= machine.program.length) {
    return [soFar]
  }
  // Solve for one octal digit at a time with DFS
  const toAdd = 8n ** BigInt(machine.program.length - 1 - currentIndex)
  const solutions = []
  for (let i = 0n; i < 8n; i++) {
    const toTest = toAdd * i + soFar
    machine.reset(toTest, regB, regC)
    machine.executeFull()
    const indexToCheck = machine.program.length - 1 - currentIndex
    if (machine.out[indexToCheck] !== BigInt(machine.program[indexToCheck])) continue
    solutions.push(...findPrograms(machine, currentIndex + 1, toTest, regB, regC))
  }
  return solutions
}
