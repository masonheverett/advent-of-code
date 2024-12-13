import _ from 'lodash'

// Gotta use BigInt thanks to this
const PRIZE_OFFSET = 10000000000000n

export const solve = (data) => {
  let total = 0n
  _.chunk(data, 4).forEach(chunk => {
    // Parse input
    const ax = BigInt(chunk[0].match(/X\+\d+/)[0].substring(2))
    const ay = BigInt(chunk[0].match(/Y\+\d+/)[0].substring(2))
    const bx = BigInt(chunk[1].match(/X\+\d+/)[0].substring(2))
    const by = BigInt(chunk[1].match(/Y\+\d+/)[0].substring(2))
    const px = BigInt(chunk[2].match(/X=\d+/)[0].substring(2)) + PRIZE_OFFSET
    const py = BigInt(chunk[2].match(/Y=\d+/)[0].substring(2)) + PRIZE_OFFSET
    // Solve for a
    //   (ax)(a) + (bx)(b) = px :: b = (px - (ax)(a)) / bx
    //   (ay)(a) + (by)(b) = py :: b = (py - (ay)(a)) / by
    //   (px - (ax)(a)) / bx = (py - (ay)(a)) / by
    //   px - (ax)(a) = (bx * (py - (ay)(a))) / by
    //   by * (px - (ax) (a)) = bx * (py - (ay)(a))
    //   (by)(px) - (by)(ax)(a) = (bx)(py) - (bx)(ay)(a)
    //   (bx)(ay)(a) - (by)(ax)(a) + (by)(px) = (bx)(py)
    //   (bx)(ay)(a) - (by)(ax)(a) = (bx)(py) - (by)(px)
    //   ((bx)(ay) - (by)(ax))(a) = (bx)(py) - (by)(px)
    //   a = ((bx)(py) - (by)(px)) / ((bx)(ay) - (by)(ax))
    const a = ((bx * py) - (by * px)) / ((bx * ay) - (by * ax))
    // Solve for b
    const b = (px - (ax * a)) / bx
    // Verify there was no rounding due to BigInt, add to total
    if ((ax * a) + (bx * b) === px && (ay * a) + (by * b) === py) total += 3n * a + b
  })
  console.log(total)
}
