const assert = require('assert');

module.exports = options => {
  const { tokenKey } = options;

  assert.strictEqual(typeof tokenKey, 'string', 'A tokenkey is required. Set it in config file.');

  return async function token(ctx, next) {
    const token = ctx.cookies.get('token') || ctx.request.query?.token;

    if (token == null) {
      ctx.throw(401, 'Token is required.');
    }

    try {
      const unwrappedToken = ctx.service.token.unwrapToken(token);

      if (!unwrappedToken) {
        ctx.throw(403, 'Invalid token.');
      }

      ctx.token = unwrappedToken;
    } catch {
      ctx.throw(403, 'Invalid token.');
    }

    await next();
  };
};
