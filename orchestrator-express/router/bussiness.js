const express = require("express");
const bussinessRouter = express.Router();
const bussinessController = require("../controllers/bussiness");

bussinessRouter.get("/", bussinessController.getAll);
bussinessRouter.get("/:slug", bussinessController.getBySlug);
bussinessRouter.post("/", bussinessController.post);

module.exports = bussinessRouter;
