const successHandler = (req, res, next) => {
  res.status(200).json({ status: true, data: req.data ?? null, message: req.message ?? null });
  next();
};
module.exports = {
  successHandler,
};
