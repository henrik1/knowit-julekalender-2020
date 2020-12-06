import fetch from 'node-fetch';

const getData = async () => {
  const response = await fetch('https://julekalender-backend.knowit.no/challenges/6/attachments/godteri.txt');
  return (await response.text()).split(',').map(n => parseInt(n));
};

const solve = async (alver) => {
  const poser = await getData();
  const sums = [];

  poser.forEach((pose, idx) => {
    if (idx === 0) sums[idx] = pose;
    else {
      sums[idx] = sums[idx-1] + pose;
    }
  });

  let res = 0;
  sums.forEach(s => {
    if (s % alver === 0) res = s;
  });

  console.log(res / alver);
};

solve(127);


