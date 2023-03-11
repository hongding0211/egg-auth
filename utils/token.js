const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

/**
 * @param {any} data data
 * @param {string} tokenKey tokenKey
 * @package {string} tokenKey
 * @return {string} token
 */
const wrap = (data, tokenKey) => {
  const k = `${Math.floor(Date.now() / (2 * 60 * 1000))}_${tokenKey}`;
  const v = JSON.stringify(data);

  const encryptedData = {
    data: CryptoJS.AES.encrypt(v, k).toString(),
  };

  return jwt.sign(encryptedData, k, {
    expiresIn: '180d',
  });
};

/**
 * @param {string} token token
 * @param {string} tokenKey tokenKey
 * @package {string} tokenKey
 * @return {any} data
 */
const unwrap = (token, tokenKey) => {
  const { iat } = jwt.decode(token);
  const k = `${Math.floor(iat / (2 * 60))}_${tokenKey}`;
  const { data } = jwt.verify(token, k);
  if (!data) {
    return null;
  }
  const decryptedData = CryptoJS.AES.decrypt(data, k);
  return {
    ...JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8)),
  };
};

module.exports = {
  wrap,
  unwrap,
};
