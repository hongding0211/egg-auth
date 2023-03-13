const mock = require('egg-mock');

const delay = time => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, time);
});

describe('test/middleware/traffic.test.js', () => {
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

  it('reach traffic limit', async () => {
    await delay(app.config.traffic.windowSize);
    for (let i = 0; i < app.config.traffic.maxRequest; i++) {
      await app.httpRequest().get('/test?token=' + token);
    }
    await app
      .httpRequest()
      .get('/test?token=' + token)
      .expect(500);

    await delay(app.config.traffic.windowSize);
    await app
      .httpRequest()
      .get('/test?token=' + token)
      .expect(200);
  });
});
