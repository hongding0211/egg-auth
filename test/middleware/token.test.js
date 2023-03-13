const mock = require('egg-mock');

describe('test/middleware/token.test.js', () => {
  let app;
  let ctx;
  let token;
  before(() => {
    app = mock.app({
      baseDir: 'app',
    });
    return app.ready();
  });
  before(() => {
    ctx = app.mockContext();
    token = ctx.service.token.wrapToken({
      _id: 'mock_id',
    });
  });

  it('with token', async () => {
    await app
      .httpRequest()
      .get('/test?token=' + token)
      .expect(200);
  });

  it('undefined token', async () => {
    await app
      .httpRequest()
      .get('/test')
      .expect(401);
  });

  it('unvalid token', async () => {
    await app
      .httpRequest()
      .get('/test?token=foo_token')
      .expect(403);
  });
});
