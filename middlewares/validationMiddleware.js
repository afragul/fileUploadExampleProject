const bodyValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      req.validated = await schema.validateAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  bodyValidationMiddleware,
};
