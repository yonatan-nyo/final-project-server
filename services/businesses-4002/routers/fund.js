const express = require("express");
const fundRouter = express.Router();
const fundController = require("../controllers/funds");

fundRouter.get("/byUser/:UserId", fundController.getByUserId);

module.exports = fundRouter;
