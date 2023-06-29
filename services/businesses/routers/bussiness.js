const express = require("express");
const bussinessRouter = express.Router();
const bussinessController = require("../controllers/bussiness");

bussinessRouter.get("/", bussinessController.getAll);
bussinessRouter.post("/", bussinessController.post);
bussinessRouter.get("/:slug", bussinessController.getBySlug);

module.exports = bussinessRouter;
