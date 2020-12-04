const _ = require('lodash')

const solve = (data) => {
  const fields = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:']
  var valid = 0
  var doc = []
  for (i = 0; i < data.length; i++) {
    if (data[i] !== '') {
      _.forEach(fields, (field) => {
        if (_.includes(data[i], field)) {
          doc.push(field)
        }
      })
    }
    else {
      if (doc.length === fields.length) {
        valid++
      }
      doc = []
    }
  }
  console.log(valid)
}

module.exports = { solve }
