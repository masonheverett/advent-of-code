import _ from 'lodash'

let panelData = []
let relativeBase = 0

class PanelGrid {
  constructor(x, y, color = 'B') {
    this.x = x
    this.y = y
    this.hasBeenPainted = false
    this.color = color
  }
}

const robot = {
  currentDirection: 0,
  paintedGrid: [new PanelGrid(0, 0, 'B')],
  getPosition: (index, x, y) => {
    switch (index) {
      case 0:
        y--
        break
      case 1:
        x--
        break
      case 2:
        y++
        break
      case 3:
        x++
        break
    }
    return [x, y]
  }
}

export const solve = (data) => {
  panelData = data[0].split(',').map(Number)
  let movement = []
  let x = 0
  let y = 0
  let currentPanel = []

  for (let i = 0; i < panelData.length; i++) {

    if (movement.length === 2) {

      let firstPaint = movement.shift()
      let secondDirection = movement.shift()

      currentPanel = robot.paintedGrid.find(el => el.x === x && el.y === y)

      // paint it first or paint it back
      if (firstPaint === 0) {
        currentPanel.color = 'B'
      } else {
        currentPanel.color = 'W'
      }

      // remember to set this so we know we have been here
      if (currentPanel.hasBeenPainted === false) {
        currentPanel.hasBeenPainted = true
      }

      let nowX = currentPanel.x
      let nowY = currentPanel.y

      if (secondDirection === 0) {
        robot.currentDirection = mod((robot.currentDirection + 1), 4)
      } else {
        robot.currentDirection = mod((robot.currentDirection - 1), 4)
      }
      let nextPos = robot.getPosition(robot.currentDirection, nowX, nowY)

      let doesExist = robot.paintedGrid.find((el) => el.x === nextPos[0] && el.y === nextPos[1])

      if (!doesExist) {
        robot.paintedGrid.push(new PanelGrid(nextPos[0], nextPos[1]))
      }

      [x, y] = nextPos
    }

    let opcode = panelData[i].toString()
    let instruction
    if (opcode.length === 1) {
      instruction = parseInt(opcode[opcode.length - 1])
    } else {
      instruction = parseInt(opcode[opcode.length - 2] + opcode[opcode.length - 1])
    }

    currentPanel = robot.paintedGrid.find((el) => el.x === x && el.y === y)

    if (instruction === 99) {
      console.log(robot.paintedGrid.filter(el => el.hasBeenPainted === true).length)
      return movement
    }

    let p1
    if (opcode[opcode.length - 3]) {
      p1 = parseInt(opcode[opcode.length - 3])
    } else {
      p1 = 0
    }
    let val1 = readIndex(p1, i + 1)

    let p2
    if (opcode[opcode.length - 4]) {
      p2 = parseInt(opcode[opcode.length - 4])
    } else {
      p2 = 0
    }
    let val2 = readIndex(p2, i + 2)

    let p3
    if (opcode[opcode.length - 5]) {
      p3 = parseInt(opcode[opcode.length - 5])
    } else {
      p3 = 0
    }
    let val3 = readIndex(p3, i + 3)

    switch (instruction) {
      case 1:
        panelData[val3] = readValue(val1) + readValue(val2)
        i += 3
        break
      case 2:
        panelData[val3] = readValue(val1) * readValue(val2)
        i += 3
        break
      case 3:
        if (currentPanel.color === 'B') {
          panelData[val1] = 0
        } else {
          panelData[val1] = 1
        }
        i += 1
        break
      case 4:
        movement.push(panelData[val1])
        i += 1
        break
      case 5:
        if (readValue(val1) !== 0) {
          i = readValue(val2) - 1
        } else {
          i += 2
        }
        break
      case 6:
        if (readValue(val1) === 0) {
          i = readValue(val2) - 1
        } else {
          i += 2
        }
        break
      case 7:
        if (readValue(val1) < readValue(val2)) {
          panelData[val3] = 1
        } else {
          panelData[val3] = 0
        }
        i += 3
        break
      case 8:
        if (readValue(val1) === readValue(val2)) {
          panelData[val3] = 1
        } else {
          panelData[val3] = 0
        }
        i += 3
        break
      case 9:
        relativeBase += readValue(val1)
        i += 1
        break
    }
  }
}

const readValue = (a) => {
  if (panelData[a] === undefined) {
    return 0
  } else {
    return panelData[a]
  }
}

const readIndex = (mode, ip) => {
  switch (mode) {
    case 0:
      return panelData[ip]
    case 1:
      return ip
    case 2:
      return relativeBase + panelData[ip]
  }
}

const mod = (n, m) => ((n % m) + m) % m
