function ErrorHandler(err, req, res, next) {
  console.log(err.name);
  if (err?.name) {
    if (err.name === "something") {
    } else {
      console.log(err);
      res.status(500).json("Internal server error");
    }
  } else {
    console.log(err);
    res.status(500).json("Internal server error");
  }
}
module.exports = ErrorHandler;
