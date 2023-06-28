const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const authentication = require("../midleware/Auth");

userRouter.get("/all", userController.readAllUsers);
userRouter.get("/profile", authentication, userController.readProfile);
userRouter.patch("/profile", authentication, userController.editUsername);

module.exports = userRouter;
