const express = require("express");
const bussinessRouter = express.Router();
const bussinessController = require("../controllers/bussiness");

bussinessRouter.get("/", bussinessController.getAll);
bussinessRouter.get("/find/:BussinessId", bussinessController.getById);
bussinessRouter.get("/:slug", bussinessController.getBySlug);
bussinessRouter.post("/", bussinessController.post);

module.exports = bussinessRouter;
