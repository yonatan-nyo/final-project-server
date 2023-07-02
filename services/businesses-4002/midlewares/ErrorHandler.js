function ErrorHandler(err, req, res, next) {
  console.log(err);
  res.status(err?.statusCode).json(err?.msg);
}
module.exports = ErrorHandler;
