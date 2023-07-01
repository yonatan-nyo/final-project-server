function ErrorHandler(err, req, res, next) {
  res.status(err?.statusCode).json(err?.msg);
}
module.exports = ErrorHandler;
