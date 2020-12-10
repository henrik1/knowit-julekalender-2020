import fetch from 'node-fetch';

const getData = async () => {
  const response = await fetch('https://julekalender-backend.knowit.no/challenges/7/attachments/forest.txt');
  return (await response.text()).split('\n').reverse();
};

const solve = async () => {
  const data = await getData();
  const regExp = /#/g;
  const trees = [ ...data[1].matchAll(regExp) ];
  let count = 0;

  trees.forEach(m => {
    let y = 1;
    let isSym = true;
    while (isSym && y < data.length-1) {
      let str = '|';
      let dx = 1;
      while (isSym && m.index-dx >= 0 && m.index+dx < data[y].length) {
        if (str.slice(0, 2) === '  ' && str.slice(-2) === '  ') break;
        if (str.slice(0, 1) !== str.slice(-1)) isSym = false;
        str = `${data[y][m.index-dx]}${str}${data[y][m.index+dx]}`;
        dx++;
      }
      y++;
    }
    count += isSym ? 1 : 0;
  });

  console.log('SVAR', count);
};

solve();

