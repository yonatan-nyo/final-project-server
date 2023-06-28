const express = require("express");
const bussinessRouter = express.Router();
const bussinessController = require('../controllers/bussiness')


bussinessRouter.get("/", bussinessController.readAllBussinesses);
bussinessRouter.get("/:slug", bussinessController.getBussiness);
bussinessRouter.post("/", bussinessController.addBussiness);

module.exports = bussinessRouter;