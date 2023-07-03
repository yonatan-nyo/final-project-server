// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//   }

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const ErrorHandler = require("./middlewares/ErrorHandler");

const bussinessRouter = require("./router/bussiness");
const usersRouter = require("./router/user");
const paymentRouter = require("./router/payment");
const loginRouter = require("./router/login");
const { InitializeRedis } = require("./config/redisConfig");
const fileUpload = require("express-fileupload");
const compression = require("compression");
const { initialize: initializeFirebase } = require("./config/admin");

//middleware
app.use(compression());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/bussinesses", bussinessRouter);
app.use("/login", loginRouter);

app.use("/users", usersRouter);
app.use("/payments", paymentRouter);

app.use(ErrorHandler);

(() => {
  try {
    initializeFirebase();
    InitializeRedis();
    app.listen(port, () => {
      console.log(`Orchestrator-express listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed initialize redis");
  }
})();

// module.exports = app
