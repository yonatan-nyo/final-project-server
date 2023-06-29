const express = require("express");
const fundRouter = express.Router();
const fundController = require('../controllers/funds')


fundRouter.get("/", fundController.readAllFunds);
fundRouter.get("/:slug", fundController.getBySlug);
fundRouter.post("/midtrans/:slug", fundController.createPaymentMidtrans);
fundRouter.post("/:slug", fundController.postSuccess);

module.exports = fundRouter;