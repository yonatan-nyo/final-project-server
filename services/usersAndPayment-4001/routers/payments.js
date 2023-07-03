const express = require("express");
const routerPayment = express.Router();
const paymentController = require("../controllers/payment");
const authentication = require("../midleware/Auth");

routerPayment.post(
  "/init",
  authentication,
  paymentController.initializePayment
);
routerPayment.post(
  "/success",
  authentication,
  paymentController.successPayment
);
// routerPayment.post('/checkout-session'.paymentController.checkoutStripe)
// routerPayment.post("/", authentication, paymentController.createPayment);
// routerPayment.get("/", authentication, paymentController.getAllPayments);
// routerPayment.get("/:id", authentication, paymentController.getPaymentById);
// routerPayment.delete("/:id", authentication, paymentController.deletePayment);

module.exports = routerPayment;
