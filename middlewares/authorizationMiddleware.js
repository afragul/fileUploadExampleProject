const createError = require("http-errors");

const authorizationMiddleware = (Roles) => {
  return async (req, res, next) => {
    try {
      if (!Roles.includes(req.User.Role.Name)) throw new createError.Forbidden();
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authorizationMiddleware,
};
