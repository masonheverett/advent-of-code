const _ = require('lodash')

const solve = (data) => {
  const parsed = parse(data)
  const validTickets = parsed.tickets.filter((ticket) => isValidTicket(ticket, parsed.ranges))
  const fieldMappings = mapFields(validTickets, parsed.ranges)
  console.log(departureProduct(fieldMappings, validTickets[0], parsed.departureFields))
}

const parse = (data) => {
  const ranges = []
  const departureFields = []
  let lineNum = 0
  while (data[lineNum] !== '') {
    if (/^departure/.test(data[lineNum])) departureFields.push(lineNum)
    const sections = data[lineNum].split(' ').slice(-3)
    ranges.push(sections[0].split('-').map(Number).concat(sections[2].split('-').map(Number)))
    lineNum++
  }
  lineNum += 2
  const tickets = []
  tickets.push(data[lineNum].split(',').map(Number))
  lineNum += 3
  while (lineNum < data.length) {
    tickets.push(data[lineNum].split(',').map(Number))
    lineNum++
  }
  return { ranges, tickets, departureFields }
}

const isValidTicket = (ticket, ranges) => {
  return _.every(ticket, (value) => isValidValue(value, ranges))
}

const isValidValue = (value, ranges) => {
  return ranges.reduce((prev, curr) => {
    return prev || isValidForRange(value, curr)
  }, false)
}

const isValidForRange = (value, range) => {
  return (value >= range[0] && value <= range[1]) || (value >= range[2] && value <= range[3])
}

const initFieldMappings = (ticketSize, rangesLength) => {
  return _.times(rangesLength, () => {
    const possibilities = []
    for (let i = 0; i < ticketSize; i++) possibilities.push(i)
    return possibilities
  })
}

const mapFields = (tickets, ranges) => {
  fields = initFieldMappings(tickets.length, ranges.length)
  tickets.forEach((ticket) => {
    ticket.forEach((value, valueIndex) => {
      ranges.forEach((range, rangeIndex) => {
        if (!isValidForRange(value, range)) _.remove(fields[rangeIndex], (n) => n === valueIndex)
      })
    })
  })
  const fieldsWithIndeces = fields.map((field, index) => ({ index: index, places: field }))
  const sortedFields = _.sortBy(fieldsWithIndeces, (field) => field.places.length)
  const fieldMappings = Array.of(sortedFields.length)
  for (let i = 0; i < sortedFields.length; i++) {
    fieldMappings[sortedFields[i].index] = sortedFields[i].places[0]
    for (let j = i + 1; j < sortedFields.length; j++) {
      _.remove(sortedFields[j].places, (place) => place === fieldMappings[sortedFields[i].index])
    }
  }
  return fieldMappings
}

const departureProduct = (fieldMappings, ticket, departureFields) => {
  return departureFields.reduce((prev, curr) => {
    return prev * ticket[fieldMappings[curr]]
  }, 1)
}

module.exports = { solve }
