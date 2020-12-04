import fetch from 'node-fetch';

const getData = async (url) => {
  const response = await fetch(url);
  return response.text();
};

const reverse = (str) => (str.split('').reverse().join(''));

const searchAt = (x, y, rows, wordlist, alreadyFound) => {
  const found = {};

  wordlist.forEach(word => {
    if (alreadyFound[word]) return;
    if (rows[y][x] !== word[0] && rows[y][x] !== word.slice(-1)) return;

    // horizontal
    if (rows[y].indexOf(word) > -1 || rows[y].indexOf(reverse(word)) > -1) found[word] = true;

    // vertical
    if (y + word.length < rows.length) {
      let next = '';
      for (let i = 0; i < word.length; i++) {
        next = `${next}${rows[y+i][x]}`;
      }
      if (next === word || next === reverse(word)) found[word] = true;
    }

    // diag 1
    if (x + word.length < rows[y].length && y + word.length < rows.length) {
      let next = '';
      for (let i = 0; i < word.length; i++) {
        next = `${next}${rows[y+i][x+i]}`;
      }
      if (next === word || next === reverse(word)) found[word] = true;
    }

    // diag 2
    if (x + word.length < rows[y].length && y - word.length >= 0) {
      let next = '';
      for (let i = 0; i < word.length; i++) {
        next = `${next}${rows[y-i][x+i]}`;
      }
      if (next === word || next === reverse(word)) found[word] = true;
    }
  });
  return found;
};

const solve = async () => {
  const rows = (await getData('https://gist.githubusercontent.com/knowitkodekalender/d277d4f01a9fe10f7c1d92e2d17f1b31/raw/49da54e4372a83f4fc11d7137f19fc8b4c58bda6/matrix.txt')).split('\n');
  const words = (await getData('https://gist.githubusercontent.com/knowitkodekalender/9e1ba20cd879b0c6d7af4ccfe8a87a19/raw/b19ae9548a33a825e2275d0283986070b9b7a126/wordlist.txt')).split('\n');

  let found = {};
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      found = { ...found, ...searchAt(x, y, rows, words, found) };
    }
  }
  console.log(words.filter(w => !found[w]));
};

solve();
