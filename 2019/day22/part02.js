import _ from 'lodash'
import bigintCryptoUtils from 'bigint-crypto-utils'

export const solve = (data) => {
  const times = 101741582076661n
  const deckSize = 119315717514047n
  const cardPosition = 2020n

  let incMult = 1n
  let dOffset = 0n

  _.each(data, (inst) => {
    if (inst === 'deal into new stack') {
      incMult = -incMult % deckSize
      dOffset = (dOffset + incMult) % deckSize
    } else if (_.includes(inst, 'cut')) {
      const num = BigInt(inst.match(/-?\d+/))
      dOffset = (dOffset + num * incMult) % deckSize
    } else if (_.includes(inst, 'deal with increment')) {
      const num = BigInt(inst.match(/-?\d+/))
      incMult = (incMult * bigintCryptoUtils.modInv(num, deckSize)) % deckSize
    }
  });

  const increment = bigintCryptoUtils.modPow(incMult, times, deckSize)

  let offset = (dOffset * (1n - increment) * bigintCryptoUtils.modInv((1n - incMult) % deckSize, deckSize)) % deckSize

  console.log(Number((offset + increment * cardPosition) % deckSize))
}
