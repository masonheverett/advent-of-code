import _ from 'lodash'

export const solve = (data) => {
  var count = 0;
  const numberData = data.map(x => Number(x));
  const trioMeasureData = [];
  for(var i=0; i+1 < numberData.length && i+2 < numberData.length; i++) {
    trioMeasureData.push((numberData[i] + numberData[i+1] + numberData[i+2]));
  }

  for(var i=0; i+1 < trioMeasureData.length; i++) {
    if(trioMeasureData[i+1] > trioMeasureData[i]) {
      count++;
    }
  }
  console.log(count);
}
