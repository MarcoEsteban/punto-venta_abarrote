const bcryptjs = require("bcryptjs");

exports.hashPassword = (password) => {
  const encryptedPassword = bcryptjs.hash(password, 10);
  return encryptedPassword;
};

exports.verifyPassword = (password, passwordHash) => {
  const pass = bcryptjs.compare(password, passwordHash);
  return pass;
};
