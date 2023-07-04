function ErrorHandler(err, req, res, next) {
  console.log(err);
  if (err.msg) {
    res.status(err?.statusCode).json(err?.msg);
  } else {
    res.status(500).json("Internal Server Error");
  }
}
module.exports = ErrorHandler;
