const express = require("express");
const fundRouter = express.Router();
const fundController = require("../controllers/funds");

fundRouter.post("/midtrans", fundController.createPaymentMidtrans);
fundRouter.post("/stripe", fundController.createPaymentStripe);
fundRouter.post("/", fundController.fundSuccess);
fundRouter.get("/byUser/:UserId", fundController.getByUserId);

module.exports = fundRouter;
