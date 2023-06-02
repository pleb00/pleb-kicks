const { verifyToken } = require("../helpers/jwt");
const { Item, User } = require("../models/index");

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token === null) {
      throw {
        name: "AuthenticationError",
        msg: "login please",
      };
    }

    const out = verifyToken(access_token);
    req.user = out;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
