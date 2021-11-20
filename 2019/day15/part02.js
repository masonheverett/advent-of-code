const _ = require('lodash')
const runProgram = require('../shared/intcode.js').runProgram

const solve = (data) => {
  const parsedData = data[0].split(',').map(Number)
  let pointer;
  let relativeBase;
  let pathCounter = new Set();
  let p = 0;
  let largeSteps = 0;
  let p1 = 0;

  let visited = []
  visited.push([])
  let queue = []
  queue.push({ x: 0, y: 0, steps: 0, painter: pointer, relativeBase: relativeBase, dataProgram: parsedData })

  let found = false;
  let dPos = {
    1: { x: 0, y: -1 },
    2: { x: 0, y: 1 },
    3: { x: -1, y: 0 },
    4: { x: 1, y: 0 },
  }

  while (!found) {
    let current = queue.shift();
    if(current === undefined || current.x === undefined) {
      //let p1 = 250; //330
      console.log('p1: ' + p1)
      console.log('largesteps counter: ' + largeSteps);
      console.log('pathCOunter: ' + pathCounter.size)
      console.log('part two answer: ' + eval( pathCounter.size - largeSteps + 1 ));
      return;
    }

    if (!visited[current.x] || !visited[current.x][current.y]) {
      if (!visited[current.x]) {
        visited[current.x] = []
      }
      visited[current.x][current.y] = true;
      console.log("visited x: " + current.x + " y: " + current.y);

      let dataClone = current.dataProgram;
      let steps = current.steps + 1;

      for (let direction = 1; direction <= 4; direction++) {
        let newX = current.x + dPos[direction].x;
        let newY = current.y + dPos[direction].y;
        let newData  = dataClone.slice();
        console.log("direction: " + direction + " newX: " + newX + " newY: " + newY);
        let output = runProgram({ data: newData, relativeBase: current.relativeBase, pointer: current.pointer}, direction);

        console.log("output has value: " + output.output);

        if (eval(output.output) == 2) {
          if(p1 == 0) {
          console.log(steps);
          console.log('__________________________________part 1 solve: ' + steps);
          p1 = steps;
          }
          //found = true;
          //return;
        } else if (eval(output.output) == 0) {
          if (!visited[newX]) {
            visited[newX] = []
          }
          visited[newX][newY] = true;
        } else if (eval(output.output) == 1) {

          console.log('pushing newX,newY: ' + newX + "," + newY + ' with pointer: ' + output.instructionPointer + ' with relativerBase: ' + output.relativeBase + ' data index: ' + output.dataNdx);

          if(steps > largeSteps) {
            largeSteps = steps;
          }

          p++;

          pathCounter.add(newX.toString() + ',' + newY.toString());
          queue.push({
            x: newX,
            y: newY,
            steps: steps,
            relativeBase: output.relativeBase,
            pointer: output.dataNdx,
            dataProgram: output.data
          });
        } else {
          console.log("error so breaking")
          return;
        }
      }
    }
  }
}

module.exports = { solve }
