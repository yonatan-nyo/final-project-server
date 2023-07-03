const express = require("express");
const routerPayment = express.Router();
const paymentController = require("../controllers/payment");
const authentication = require("../midleware/Auth");

routerPayment.post("/init", authentication, paymentController.initializePayment);
routerPayment.post("/success", authentication, paymentController.successPayment);
routerPayment.get("/byUser/:UserId", paymentController.getByUserId);

module.exports = routerPayment;
