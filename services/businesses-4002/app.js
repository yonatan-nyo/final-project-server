require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bussinessRouter = require("./routers/bussiness");
const fundRouter = require("./routers/fund");
const ErrorHandler = require("./midlewares/ErrorHandler");
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/bussinesses", bussinessRouter);
app.use("/funds", fundRouter);

app.use(ErrorHandler);

module.exports = app;
