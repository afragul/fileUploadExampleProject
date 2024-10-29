
const { decodeToken, refreshToken } = require("../helpers/jwtHelper");
const createError = require("http-errors");


const authenticationMiddleware = (req, res, next) => {
  try {
    if (req.get("Authorization")) {
      const header = req.get("Authorization");

      //remove 'bearer' key
      const token = header.split(" ")[1];

      var result = decodeToken(token);
      if (result.success) {
        req.User = result.data.User;
        next();
      } else {
        throw new createError.Unauthorized(); 
      }
    } else {
      throw new createError.Unauthorized();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticationMiddleware,
};
