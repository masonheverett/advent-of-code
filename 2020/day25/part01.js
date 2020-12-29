const _ = require('lodash')

const solve = (data) => {
  const subjectNumber = 7
  const divNumber = 20201227
  const cardPublicKey = parseInt(data[0])
  const doorPublicKey = parseInt(data[1])
  let cardCount = 0
  let doorCount = 0
  let cardNum = 1
  let doorNum = 1
  let cardEncryptionKey = _.clone(cardPublicKey)
  let doorEncryptionKey = _.clone(doorPublicKey)
  while (cardNum != cardPublicKey) {
    cardNum *= subjectNumber
    cardNum %= divNumber
    cardCount++
  }
  while (doorNum != doorPublicKey) {
    doorNum *= subjectNumber
    doorNum %= divNumber
    doorCount++
  }
  for (i = 1; i < doorCount; i++) {
    cardEncryptionKey *= cardPublicKey
    cardEncryptionKey %= divNumber
  }
  for (i = 1; i < cardCount; i++) {
    doorEncryptionKey *= doorPublicKey
    doorEncryptionKey %= divNumber
  }
  console.log(cardEncryptionKey)
  console.log(doorEncryptionKey)
}

module.exports = { solve }
