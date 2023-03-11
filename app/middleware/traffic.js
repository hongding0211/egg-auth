const trafficMap = new Map();

module.exports = options => {
  return async function traffic(ctx, next) {
    const { _id } = ctx.token;
    if (_id == null) {
      ctx.throw(401, 'Invalid token.');
    }

    if (!trafficMap.has(_id)) {
      trafficMap.set(_id, {
        cnt: 0,
        expireAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      });
    }

    const t = trafficMap.get(_id);

    t.cnt += t.cnt <= options.maxRequest ? 1 : 0;

    if (t.cnt > options.maxRequest) {
      t.cnt--;
      ctx.throw(500, 'Reach traffic limit.');
    } else {
      setTimeout(() => {
        const t = trafficMap.get(_id);
        if (t == null) {
          return;
        }

        t.cnt = t.cnt < 1 ? 0 : t.cnt - 1;
        if (Date.now() > t.expireAt) {
          trafficMap.delete(_id);
        }
      }, options.windowSize);
    }

    await next();
  };
};
