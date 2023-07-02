const express = require("express");
const bussinessRouter = express.Router();
const bussinessController = require("../controllers/bussiness");

bussinessRouter.get("/", bussinessController.getAll);
bussinessRouter.get("/:slug", bussinessController.getBySlug);
bussinessRouter.post("/", bussinessController.post);
bussinessRouter.get("/byUser/:UserId", bussinessController.getByUserId);
// bussinessRouter.post('/midtrans',bussinessController.midtrans)

module.exports = bussinessRouter;
