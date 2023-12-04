const ERROR_VALIDATION = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const OK_SERVER = 200;

const REG_URL = /(https:\/\/|http:\/\/){1}[a-zA-Z.\-_~:/?#[\]@!$&'()*+,;=]+/;
const REG_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

module.exports = {
  ERROR_VALIDATION,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  OK_SERVER,
  REG_URL,
  REG_EMAIL,
};
