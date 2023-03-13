'use strict';

/**
 * egg-auth default config
 * @member Config#auth
 * @property {String} SOME_KEY - some description
 */
exports.token = {
  tokenKey: 'mock_token_key',
};
exports.traffic = {
  maxRequest: 5,
  windowSize: 500,
};
exports.keys = 'mock_keys';
