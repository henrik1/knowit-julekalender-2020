
const isPrime = (n) => {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3, s = n ** 0.5; i < s; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

const findPrevPrime = (start) => {
  let num = start;
  while(num > 0 && !isPrime(num)) {
    num--;
  }
  return num;
};

const solve = (max = 5433000) => {
  const a = Date.now();
  let delivered = 0;
  let next = 0;
  while(next <= max) {
    if (`${next}`.indexOf('7') > -1) {
      next += findPrevPrime(next) + 1;
    } else {
      next++;
      delivered++;
    }
  }
  return delivered;
};

console.log('Svar:', solve(5433000));
