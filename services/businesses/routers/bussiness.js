const express = require("express");
const bussinessRouter = express.Router();
const bussinessController = require('../controllers/bussiness')


// bussinessRouter.get("/login", bussinessController.login);

module.exports = bussinessRouter;