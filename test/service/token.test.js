const assert = require('assert');
const mock = require('egg-mock');

describe('test/service/token.test.js', () => {
  let app;
  let ctx;
  before(() => {
    app = mock.app({
      baseDir: 'app',
    });
    return app.ready();
  });
  before(() => {
    ctx = app.mockContext();
  });

  it('token wrap and unwrap', () => {
    const mockData = {
      _id: 'mock_id',
    };

    const token = ctx.service.token.wrapToken(mockData);
    const unwrapData = ctx.service.token.unwrapToken(token);

    assert.deepEqual(mockData, unwrapData);
  });

  it('tokenKey should not be empty', () => {
    mock(app.config, 'token', {
      tokenKey: undefined,
    });

    assert.throws(ctx.service.token.wrapToken);
  });
});
