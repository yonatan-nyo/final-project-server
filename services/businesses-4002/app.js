require("dotenv").config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const express = require("express");
const bussinessRouter = require("./routers/bussiness");
const fundRouter = require("./routers/fund");
const ErrorHandler = require("./midlewares/ErrorHandler");
const fileUpload = require("express-fileupload");
const app = express();

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
app.use("/funds", fundRouter);

app.use(ErrorHandler);

module.exports = app;
