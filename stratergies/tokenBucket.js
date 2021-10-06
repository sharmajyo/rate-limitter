const BaseStratergy = require('./stratergyAbstract');

module.exports = class TokenBucket extends BaseStratergy {
  constructor(maxCapacity, refillRate) {
    super(maxCapacity, refillRate);
    this.currentBucketSize = this.maxCapacity;
    this.lastRefillTime = Date.now();
  }

  allowRequest(token) {
    this.refill();
    let isAllowed = this.currentBucketSize > token;
    if (isAllowed) {
      this.currentBucketSize -= token;
    }

    return isAllowed;
  }

  refill() {
    const timeNow = Date.now();

    const collectedTokens = ((timeNow - this.lastRefillTime) / 1000) * this.maxCapacity * this.refillRate;

    //console.log(timeNow, this.lastRefillTime, collectedTokens);
    this.lastRefillTime = timeNow;

    this.currentBucketSize = Math.min(this.currentBucketSize + collectedTokens, this.maxCapacity);
  }
}