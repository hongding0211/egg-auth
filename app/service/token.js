const { unwrap, wrap } = require('../../utils/token');

const Service = require('egg').Service;

class TokenService extends Service {
  constructor(...args) {
    super(...args);
    this._tokenKey = this.config.token.tokenKey;
  }

  wrapToken(payload) {
    return wrap(payload, this._tokenKey);
  }

  unwrapToken(token) {
    return unwrap(token, this._tokenKey);
  }
}

module.exports = TokenService;
