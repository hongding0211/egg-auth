const { unwrap, wrap } = require('../utils/token');
const assert = require('assert');

const Service = require('egg').Service;

class TokenService extends Service {
  constructor(...args) {
    super(...args);
    const tokenKey = this.config.token.tokenKey;
    assert.strictEqual(typeof tokenKey, 'string', 'A tokenkey is required. Set it in config file.');
    this._tokenKey = tokenKey;
  }

  wrapToken(payload) {
    return wrap(payload, this._tokenKey);
  }

  unwrapToken(token) {
    return unwrap(token, this._tokenKey);
  }
}

module.exports = TokenService;
