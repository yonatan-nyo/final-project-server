const express = require("express");
const PaymentController = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.get("/:id", PaymentController.getPayment);
paymentRouter.get("/", PaymentController.getUserPayments);
paymentRouter.post("/", PaymentController.createPayment);
paymentRouter.delete("/:id", PaymentController.deletePayment);

module.exports = paymentRouter;
