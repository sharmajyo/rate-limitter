module.exports = class BaseStratergy {
  constructor(maxCapacity, refillRate) {
    this.maxCapacity = maxCapacity;
    this.refillRate = refillRate;
  }

  allowRequest() {
    throw new Error("You have to implement the method 'allowRequest'!");
  }
}