const express = require("express");
const routerPayment = express.Router();
const paymentController = require('../controllers/payment')


// userRouter.get("/login", paymentController.login);

module.exports = routerPayment;