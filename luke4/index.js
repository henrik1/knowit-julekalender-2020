import fetch from 'node-fetch';

const getData = async (url) => {
  const response = await fetch(url);
  return response.text();
};

const solve = async () => {
  const data = await getData('https://julekalender-backend.knowit.no/challenges/4/attachments/leveringsliste.txt');

  const qtys = {};
  data.split('\n').forEach(row => {
    row.split(',').forEach(product => {
      const [name, qty] = product.split(':');
      qtys[name.trim()] = (qtys[name.trim()] || 0) + parseInt(qty.trim())
    });
  });

  const result = Math.min.apply(this, [qtys.melk / 3, qtys.mel / 3, qtys.sukker / 2, qtys.egg]);
  console.log('Svar', Math.floor(result));
};

solve();
