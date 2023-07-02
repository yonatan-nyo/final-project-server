// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//   }

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const ErrorHandler = require("./middlewares/ErrorHandler");

const bussinessRouter = require("./router/bussiness");
const fundRouter = require("./router/fund");
const usersRouter = require("./router/user");
const paymentRouter = require("./router/payment");
const loginRouter = require("./router/login");
const { InitializeRedis } = require("./config/redisConfig");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/bussinesses", bussinessRouter);
app.use("/funds", fundRouter);
app.use("/login", loginRouter);

app.use("/users", usersRouter);
app.use("/payments", paymentRouter);

app.use(ErrorHandler);

(() => {
  try {
    InitializeRedis();
    app.listen(port, () => {
      console.log(`Orchestrator-express listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed initialize redis");
  }
})();

// module.exports = app
