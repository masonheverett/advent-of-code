const _ = require('lodash')

const solve = (data) => {
  data = data.map((v) => v.split(""));

  let totalAsteroids = 0;
  data.forEach((v, y1) => v.forEach((v, x1) => {
    if (data[y1][x1] === '#') totalAsteroids+=1;
  }));

  let max = 0;
  let topx = 0;
  let topy = 0;

  data.forEach((v, y1) => v.forEach((v, x1) => {
    let count = {asteroids: totalAsteroids - 1};
    let dataSnapshot = {clone: data.slice().map(v => v.slice())};

    if (dataSnapshot.clone[y1][x1] === '#') {

      let asteroidLocs = [];

      dataSnapshot.clone.forEach((v, y2) => v.forEach((v, x2) => {
        if (dataSnapshot.clone[y2][x2] === '#') {
          asteroidLocs.push([x2, y2]);
        }
      }));

      asteroidLocs.forEach((pos) => findAsteroids(dataSnapshot, count, x1, y1, pos[0], pos[1]));

      if (count.asteroids >= max) {
        topx = x1;
        topy = y1;
        max = count.asteroids;
      }
    }
  }));

  console.log("max detected with max of: " + max + " at x: " + topx + " and y: " + topy);

}

function findAsteroids(dataSnapshot, count, x1, y1, x2, y2) {
  let offsetX = x2 - x1;
  let offsetY = y2 - y1;
  let gcd = getGcd(offsetX, offsetY);
  offsetX /= gcd;
  offsetY /= gcd;

  while (1) {
    x2 += offsetX;
    y2 += offsetY;
    if (x2 >= 0 && x2 < dataSnapshot.clone.length && y2 >= 0 && y2 < dataSnapshot.clone[0].length) {
      if (dataSnapshot.clone[y2][x2] === '#') {
        count.asteroids-=1;
      }
      dataSnapshot.clone[y2][x2] = ' ';
    } else {
      return;
    }
  }
}

function getGcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

module.exports = { solve }
