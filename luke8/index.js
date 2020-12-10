import fetch from 'node-fetch';

const getData = async () => {
  const response = await fetch('https://julekalender-backend.knowit.no/challenges/8/attachments/input.txt');
  const data = (await response.text()).split('\n');
  const locations = data.slice(0, 50).reduce((prev, next) => {
    const name = next.slice(0, next.indexOf(':'));
    const x = parseInt(next.slice(next.indexOf('(') + 1, next.indexOf(',')));
    const y = parseInt(next.slice(next.indexOf(',') + 1, next.indexOf(')')));
    return { ... prev, [name]: { x, y } };
  }, {});
  const route = data.slice(50, -1);

  return { locations, route };
};

const solve = async () => {
  const { locations, route } = await getData();
  const locationTime = Object.keys(locations).reduce((prev, next) => ({ ...prev, [next]: 0 }), {});

  let x = 0, y = 0;
  route.forEach(dest => {
    const { x: destX, y: destY } = locations[dest];
    while(x !== destX || y !== destY) {
      if (x !== destX) x += destX < x ? -1 : 1;
      else y += destY < y ? -1 : 1;

      Object.keys(locations).forEach(l => {
        const { x: locationX, y: locationY } = locations[l];
        const distance = Math.abs(x - locationX) + Math.abs(y - locationY);
        if (distance === 0) locationTime[l] += 0;
        else if (distance < 5) locationTime[l] += .25;
        else if (distance < 20) locationTime[l] += .50;
        else if (distance < 50) locationTime[l] += .75;
        else locationTime[l] += 1;
      });
    }
  });

  console.log('SVAR:', Math.max.apply(this, Object.values(locationTime)) - Math.min.apply(this, Object.values(locationTime)));
};

solve();
