const express = require("express");
const PaymentController = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.post("/init", PaymentController.initializeStripe);
paymentRouter.post("/success", PaymentController.paymentSuccess);

module.exports = paymentRouter;
