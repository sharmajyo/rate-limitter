const TokenBucket = require('./stratergies/tokenBucket');

const stratergies = { TokenBucket };
const configRuleMap = {};
const defaultOptions = { stratergy: 'TokenBucket', maxRequests: '100', refillRate: '60' };

class RateLimitter {
  constructor(config) {
    const options = Object.assign({}, defaultOptions, config);
    this.stratergy = stratergies[options.stratergy];

    this.maxRequests = options.maxRequests;
    this.refillRate = options.refillRate;
  }

  _buildStratergy(options) {
    const maxRequests = options.maxRequests || this.maxRequests;
    const refillRate = options.refillRate || this.refillRate;

    return new this.stratergy(maxRequests, refillRate);
  }

  setConfigRule(key, points = 1, options = {}) {
    configRuleMap[key] = {
      weight: points,
      stratergy: this._buildStratergy(options),
    };
  }

  removeConfigRule(key) {
    delete configRuleMap[key];
  }

  processRequest(key) {
    if (configRuleMap[key] == undefined) {
      return true;
    } else {
      const { stratergy, weight } = configRuleMap[key];
      const isAllowed = stratergy.allowRequest(weight);

      if (!isAllowed) {
        throw new Error(`Too many requests ${key}, please wait.`)
      }

      return true;
    }
  }

}

module.exports = RateLimitter;