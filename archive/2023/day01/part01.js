import _ from 'lodash'

export const solve = (data) => {
  console.log(_.sum(data.map(l => _.toNumber(l.match(/\d/)[0] + l.split('').reverse().join('').match(/\d/)[0]))))
}
