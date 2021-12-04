import _ from 'lodash'

export const solve = (data) => {
  const numbers = data[0].split(',').map(Number)
  const boards = parseBoards(data)

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      updateBoard(boards[j], numbers[i])
      if (i >= 5 && didWin(boards[j])) {
        console.log(winningScore(boards[j], numbers[i]))
        return
      }
    }
  }
}

const parseBoards = (data) => {
  const boards = []
  for (let i = 2; i < data.length; i += 6) {
    boards.push(_.slice(data, i, i + 5))
  }
  return boards.map(board => {
    return board.map(row => {
      return row.split(' ').filter(val => val !== '').map(Number)
    })
  })
}

const updateBoard = (board, number) => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (board[row][col] === number) board[row][col] = -1
    }
  }
}

const didWin = (board) => {
  for (let i = 0; i < 5; i++) {
    if (_.every(board[i], cell => cell < 0)) return true
    if (_.every(board, row => row[i] < 0)) return true
  }
  return false
}

const winningScore = (board, number) => {
  let sum = 0
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (board[row][col] > 0) sum += board[row][col]
    }
  }
  return sum * number
}
