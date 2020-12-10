import fetch from 'node-fetch';

const getData = async () => {
  const response = await fetch('https://julekalender-backend.knowit.no/challenges/10/attachments/leker.txt');
  return (await response.text()).split('\n').map(s => s.split(','));
};

const solve = async () => {
  const points = (await getData()).reduce((result, row) => (
    row.reduce((prev, next, idx) => ({
      ...prev,
      [next]: (prev[next] || 0) + (row.length - (idx+1))
    }), result)
  ), {});

  let max = 0, elf = null;
  for (let key in points) {
    if (points[key] > max) {
      max = points[key];
      elf = key;
    }
  }
  console.log('SVAR', `${elf}-${max}`);
};

solve();
