import fetch from 'node-fetch';

const getData = async () => {
  const response = await fetch('https://julekalender-backend.knowit.no/challenges/1/attachments/numbers.txt');
  const data = await response.text();
  return data.split(',').map(n => parseInt(n));
};

const solve = async () => {
  const data = await getData();
  const res = data.reduce((prev, next) => prev - next, (100000 * 100001) / 2);

  console.log('Svar: ', res);
};

solve();
