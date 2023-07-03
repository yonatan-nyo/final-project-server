const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const authentication = require("../midleware/Auth");

userRouter.get("/profile", authentication, userController.readProfile);

module.exports = userRouter;
