function ErrorHandler(err, req, res, next) {
  if (err?.statusCode) {
    res.status(err.statusCode).json(err.msg);
  } else {
    console.log(err);
    res.status(500).json("Internal server error");
  }
}
module.exports = ErrorHandler;
