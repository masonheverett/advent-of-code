const _ = require('lodash')

const solve = (data) => {
  passports = parse(data)
  console.log(_.filter(passports, isValid).length)
}

const parse = (data) => {
  let passports = [[]]
  let currentIndex = 0
  data.forEach((line) => {
    if (line === '') {
      passports.push([])
      currentIndex++
    } else {
      passports[currentIndex] = passports[currentIndex].concat(line.split(' '))
    }
  })
  return passports
}

const isValid = (passport) => {
  let validByr, validIyr, validEyr, validHgt, validHcl, validEcl, validPid
  passport.forEach((field) => {
    const kv = field.split(':')
    const key = kv[0]
    const value = kv[1]
    switch (key) {
      case 'byr':
        validByr = /^(19[2-9]\d|200[0-2])$/.test(value)
        break
      case 'iyr':
        validIyr = /^20(1\d|20)$/.test(value)
        break
      case 'eyr':
        validEyr = /^20(2\d|30)$/.test(value)
        break
      case 'hgt':
        validHgt = /^(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)$/.test(value)
        break
      case 'hcl':
        validHcl = /^#[0-9a-f]{6}$/.test(value)
        break
      case 'ecl':
        validEcl = /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value)
        break
      case 'pid':
        validPid = /^\d{9}$/.test(value)
        break
    }

  })
  return validByr && validIyr && validEyr && validHgt && validHcl && validEcl && validPid
}

module.exports = { solve }
