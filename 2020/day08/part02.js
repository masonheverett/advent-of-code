import _ from 'lodash'

export const solve = (data) => {
  for (i = 0; i < data.length; i++) {
    let temp = _.cloneDeep(data)
    const inst = data[i].split(' ')
    if (inst[0] === 'nop') temp[i] = 'jmp ' + inst[1]
    else if (inst[0] === 'jmp') temp[i] = 'nop ' + inst[1]
    acc = execute(temp)
    if (acc !== null) break
  }
  console.log(acc)
}

const execute = (data) => {
  let acc = 0
  let index = 0
  let executed = []
  while (!_.includes(executed, index) && index !== data.length) {
    const inst = data[index].split(' ')
    executed.push(index)
    switch (inst[0]) {
      case 'nop':
        index++
        break
      case 'acc':
        acc += parseInt(inst[1])
        index++
        break
      case 'jmp':
        index += parseInt(inst[1])
        break
    }
  }
  return index === data.length ? acc : null
}
