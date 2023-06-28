const express = require("express");
const fundRouter = express.Router();
const fundController = require('../controllers/funds')


fundRouter.get("/", fundController.readAllFunds);
fundRouter.post("/:", fundController.readAllFunds);

module.exports = fundRouter;