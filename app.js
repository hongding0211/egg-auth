module.exports = app => {
  app.config.coreMiddleware.splice(0, 0, ...[ 'token', 'traffic' ]);
};
