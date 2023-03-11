const { unwrap, wrap } = require('../../utils/token');

const Service = require('egg').Service;

class TokenService extends Service {
  constructor() {
    // get tokenkey from config
  }

  setToken(payload) {
    return wrap(payload, this._tokenKey);
  }

  getToken(token) {
    return unwrap(token, this._tokenKey);
  }
}
