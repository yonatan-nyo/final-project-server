const cors = require("cors");
const express = require("express");
const userRouter = require("./routers/users");
const routerPayment = require("./routers/payments");
const loginRouter = require("./routers/login");
const ErrorHandler = require("./midleware/ErrorHandler");
const app = express();

const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/payments", routerPayment);

app.use(ErrorHandler);

module.exports = app;
