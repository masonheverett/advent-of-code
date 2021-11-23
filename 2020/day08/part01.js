import _ from 'lodash'

export const solve = (data) => {
  let acc = 0
  let index = 0
  let executed = []
  while (!_.includes(executed, index)) {
    const inst = data[index].split(' ')
    executed.push(index)
    switch (inst[0]) {
      case 'nop':
        index++
        break;
      case 'acc':
        acc += parseInt(inst[1])
        index++
        break;
      case 'jmp':
        index += parseInt(inst[1])
        break;
    }
  }
  console.log(acc)
}
