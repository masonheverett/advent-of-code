import _ from 'lodash';
import readline from 'readline';

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
}

export const solve = async (data) => {
  data = data[0].split(',')
  for (let i = 0; i < data.length; i++) {
    data[i] = parseInt(data[i], 10)
  }

  let nextMinus = 0;
  let instructionPointer = -1;

  for (let i = 0; i < data.length; i += 4) {

    if(nextMinus > 0) {
      i-=nextMinus;
      nextMinus = 0;
    }

    if(instructionPointer > -1) {
      i = instructionPointer;
      instructionPointer = -1;
    }

    console.log('instruction address: ' + i);

    let opcode = data[i];
    let shortOpcode = opcode % 10;

    let p1 = 0;
    let p2 = 0;
    let p3 = 0;

    if(eval(opcode) < 100) {
      //two digit opcode and a leading 0
      p1 = 0;
      p2 = 0;
      p3 = 0;
    } else if (eval(opcode) < 119) {
      //two digit opcode and a leading 1
      p1 = 1;
      p2 = 0;
      p3 = 0;
    } else if (eval(opcode) < 1019) {
      //three digit opcode and a leading 1 with a following 0
      p1 = 0;
      p2 = 1;
      p3 = 0;
    } else if (eval(opcode) < 1119) {
      //three digit opcode and a leading 1 with a following 1
      p1 = 1;
      p2 = 1;
      p3 = 0;
    } else if (eval(opcode) < 10019) {
      //four digit opcode and a leading 1 with a following two 0s
      p1 = 0;
      p2 = 0;
      p3 = 1;
    } else if (eval(opcode) < 10119) {
      //four digit opcode and a leading 1 with a following 0 then 1
      p1 = 1;
      p2 = 0;
      p3 = 1;
    } else if (eval(opcode) < 11119) {
      //four digit opcode and a leading 1 with a following two 1s
      p1 = 1;
      p2 = 1;
      p3 = 1;
    }

    console.log('opcode: ' + opcode + ' incodes: ' + p1 + p2 + p3);

    switch (shortOpcode) {
      case 1:
        let val1 = 0;
        let val2 = 0;

        if(p1 == 0) {
          val1 = data[data[i + 1]];
        } else {
          val1 = data[i + 1];
        }

        if(p2 == 0) {
          val2 = data[data[i + 2]];
        } else {
          val2 = data[i + 2];
        }

        console.log('values: 1. ' +  val1 + ' 2. ' + val2);

        if(p3 == 0) {
          //to store in place or value in place
          data[data[i + 3]] = eval(val1) + eval(val2);
        } else {
          data[i + 3] = eval(val1) + eval(val2);
        }
        break;
      case 2:
        let val1m = 0;
        let val2m = 0;

        if(p1 == 0) {
          val1m = data[data[i + 1]];
        } else {
          val1m = data[i + 1];
        }

        if(p2 == 0) {
          val2m = data[data[i + 2]];
        } else {
          val2m = data[i + 2];
        }

        console.log('values: 1. ' +  val1m + ' 2. ' + val2m);

        if(p3 == 0) {
          //to store in place or value in place
          data[data[i + 3]] = eval(val1m) * eval(val2m);
        } else {
          data[i + 3] = eval(val1m) * eval(val2m);
        }
        break;
      case 3:
        let answer = await askQuestion("input> ");
        console.log('input of: ', answer);
        if(p1 == 0) {
          data[data[i + 1]] = answer;
          console.log('input of: ', data[data[i + 1]], ' i: ' + i);
        } else {
          data[i + 1] = answer;
          console.log('input of: ', data[i + 1], ' i: ' + i);
        }
        nextMinus=2;
        break;
      case 4:
        if(p1 == 0) {
          console.log('output of: ' + data[data[i + 1]]);
        } else {
          console.log('output of: ' + data[i + 1]);
        }
        nextMinus=2;
        break;
      case 5:
        let valf = 0;
        if(p1==0) {
          valf = eval(data[data[i + 1]]);
        } else {
          valf = eval(data[i + 1]);
        }

        if(valf > 0 || valf < 0) {
          console.log("non-zero met, setting instruction pointer to: " + data[i + 2]);
          if(p2 == 0) {
            instructionPointer = eval(data[data[i + 2]]);
          } else {
            instructionPointer = eval(data[i + 2]);
          }
        } else {
          nextMinus=1;
        }
        break;
      case 6:
        let vals = 0;
        if(p1==0) {
          vals = eval(data[data[i + 1]]);
        } else {
          vals = eval(data[i + 1]);
        }

        if(vals == 0) {
          console.log("zero met, setting instruction pointer to: " + data[i + 2]);
          if(p2 == 0) {
            instructionPointer = eval(data[data[i + 2]]);
          } else {
            instructionPointer = eval(data[i + 2]);
          }
        } else {
          nextMinus=1;
        }
        break;
      case 7:
        let vall1 = 0;
        if(p1==0) {
          vall1 = eval(data[data[i + 1]]);
        } else {
          vall1 = eval(data[i + 1]);
        }

        let vall2 = 0;
        if(p2==0) {
          vall2 = eval(data[data[i + 2]]);
        } else {
          vall2 = eval(data[i + 2]);
        }

        if(vall1 <  vall2) {
          console.log("less than met, setting value to 1 at: " + data[i + 3]);
          data[data[i + 3]] = 1;
        } else {
          console.log("less than no met, setting value to 0 at: " + data[i + 3]);
          data[data[i + 3]] = 0;
        }
        break;
      case 8:
        let vale1 = 0;
        if(p1==0) {
          vale1 = eval(data[data[i + 1]]);
        } else {
          vale1 = eval(data[i + 1]);
        }

        let vale2 = 0;
        if(p2==0) {
          vale2 = eval(data[data[i + 2]]);
        } else {
          vale2 = eval(data[i + 2]);
        }

        if(vale1 == vale2) {
          console.log("equal met, setting value to 1 at: " + data[i + 3]);
          data[data[i + 3]] = 1;
        } else {
          console.log("equal no met, setting value to 0 at: " + data[i + 3]);
          data[data[i + 3]] = 0;
        }
        break;
      case 9:
        i = data.length;
        process.exit(1);
        break;
      default:
        break
    }
  }
  console.log(data[0])
}
