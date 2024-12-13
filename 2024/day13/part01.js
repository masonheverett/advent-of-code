import _ from 'lodash'

const MAX_PUSHES = 100

export const solve = (data) => {
  let total = 0
  _.chunk(data, 4).forEach(chunk => {
    // Parse input
    const ax = _.toNumber(chunk[0].match(/X\+\d+/)[0].substring(2))
    const ay = _.toNumber(chunk[0].match(/Y\+\d+/)[0].substring(2))
    const bx = _.toNumber(chunk[1].match(/X\+\d+/)[0].substring(2))
    const by = _.toNumber(chunk[1].match(/Y\+\d+/)[0].substring(2))
    const px = _.toNumber(chunk[2].match(/X=\d+/)[0].substring(2))
    const py = _.toNumber(chunk[2].match(/Y=\d+/)[0].substring(2))
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
    // Check max pushes and for integer
    if (a > MAX_PUSHES || !_.isInteger(a)) return
    // Solve for b
    const b = (px - (ax * a)) / bx
    // Check max pushes
    if (b > MAX_PUSHES) return
    // Add to total
    total += 3 * a + b
  })
  console.log(total)
}
