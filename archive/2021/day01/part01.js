import _ from 'lodash'

export const solve = (data) => {
  var numberData = data.map(x => Number(x));
  var count = 0;

  for(var i=0; i+1 < numberData.length; i++) {
    if(numberData[i+1] > numberData[i]) {
      count++;
    }
  }
  console.log(count);
}