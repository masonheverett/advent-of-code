class Direction {
  constructor(name, abbreviation, rowDiff, colDiff, icon) {
    this.name = name
    this.abbreviation = abbreviation
    this.rowDiff = rowDiff
    this.colDiff = colDiff
    this.icon = icon
  }
}

// Primary directions
const north = new Direction('north', 'N', -1, 0, '^')
const south = new Direction('south', 'S', 1, 0, 'v')
const east = new Direction('east', 'E', 0, 1, '>')
const west = new Direction('west', 'W', 0, -1, '<')
north.cwTurn = east
south.cwTurn = west
east.cwTurn = south
west.cwTurn = north
north.ccwTurn = west
south.ccwTurn = east
east.ccwTurn = north
west.ccwTurn = south

// Secondary directions
const northeast = new Direction('northeast', 'NE', -1, 1)
const southeast = new Direction('southeast', 'SE', 1, 1)
const northwest = new Direction('northwest', 'NW', -1, -1)
const southwest = new Direction('southwest', 'SW', 1, -1)

export default {
  north,
  south,
  east,
  west,
  northeast,
  southeast,
  northwest,
  southwest,
  [north.icon]: north,
  [south.icon]: south,
  [east.icon]: east,
  [west.icon]: west,
  primary: [north, east, south, west],
  secondary: [northeast, southeast, southwest, northwest],
  all: [north, northeast, east, southeast, south, southwest, west, northwest]
}
