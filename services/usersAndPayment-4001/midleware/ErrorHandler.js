function ErrorHandler(err, req, res, next) {
  console.error(err.stack);

  switch (err.name) {
    case "ValidationError":
      res.status(400);
      res.send({ error: err.message });
      break;

    case "TypeError":
      res.status(400);
      res.send({ error: err.message });
      break;

    case "SyntaxError":
      res.status(400);
      res.send({ error: err.message });
      break;

    case "RangeError":
      res.status(400);
      res.send({ error: err.message });
      break;

    case "ReferenceError":
      res.status(400);
      res.send({ error: err.message });
      break;

    case "MongoError":
      res.status(500);
      res.send({ error: err.message });
      break;

    default:
      res.status(500);
      res.send("Internal Server Error");
      break;
  }
}

module.exports = ErrorHandler;
