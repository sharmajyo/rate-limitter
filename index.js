const RateLimitter = require('./rateLimitter');

const rateLimitter = new RateLimitter({ maxRequests: 10 });

rateLimitter.setConfigRule('GET api/v1/user', 1, { maxRequests: 20, refillRate: '2' });
rateLimitter.setConfigRule('POST api/v1/user', 5);

let count = 0;
try {
  for (let i = 0; i < 30; i++) {
    rateLimitter.processRequest('GET api/v1/user');
    count++;
  }
} catch (e) {
  console.log(e.message, count)
}

count = 0;
try {
  for (i = 0; i < 30; i++) {
    rateLimitter.processRequest('POST api/v1/user');
    count++;
  }
} catch (e) {
  console.log(e.message, count)
}

console.log('---------------------------')
setTimeout(() => {

  count = 0;
  try {
    for (let i = 0; i < 30; i++) {
      rateLimitter.processRequest('GET api/v1/user');
      count++;
    }
  } catch (e) {
    console.log(e.message, count)
  }


  count = 0;
  try {
    for (i = 0; i < 30; i++) {
      rateLimitter.processRequest('POST api/v1/user');
      count++;
    }
  } catch (e) {
    console.log(e.message, count)
  }

}, 3000)