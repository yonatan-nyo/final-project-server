function ErrorHandler(err, req, res, next) {
  console.log(err);
  res.status(err?.response?.status || 500).json(err?.response?.data || "Internal Server Error");
}
module.exports = ErrorHandler;
