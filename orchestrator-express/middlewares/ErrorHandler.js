function ErrorHandler(err, req, res, next) {
  // console.log(err);
  res.status(err?.response.status).json(err?.response.data);
}
module.exports = ErrorHandler;
