const errorHandler = (err, req, res, next) => {
  if (req.transaction) req.transaction.rollback();
  res
    .status(err.statusCode || 400)
    .json({ error: { message: err.message } })
    .send();
};

module.exports = {
  errorHandler,
};
