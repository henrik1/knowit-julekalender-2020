import fetch from 'node-fetch';

const getData = async () => {
  const response = await fetch('https://julekalender-backend.knowit.no/challenges/5/attachments/rute.txt');
  return response.text();
};

const move = {
  H: ([x, y]) => [x+1, y],
  V: ([x, y]) => [x-1, y],
  O: ([x, y]) => [x, y+1],
  N: ([x, y]) => [x, y-1]
};

const solve = async () => {
  const str = await getData();
  const coords = str.split('').reduce((prev, next) => ([
    ...prev,
    move[next](prev.slice(-1)[0])
  ]), [[0,0]]);

  let a = 0, b = 0;
  for (let i = 1; i < coords.length; i++) {
    a += coords[i][1] * coords[i-1][0];
    b += coords[i][0] * coords[i-1][1];
  }
  const area = (a - b) / 2;
  console.log('SVAR', area);
};

solve();
