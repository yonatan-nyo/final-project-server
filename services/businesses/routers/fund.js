const express = require("express");
const fundRouter = express.Router();
const fundController = require('../controllers/funds')


fundRouter.get("/", fundController.readAllFunds);
fundRouter.post("/midtrans", fundController.createPaymentMidtrans);
fundRouter.post("/", fundController.fundSuccess);

module.exports = fundRouter;