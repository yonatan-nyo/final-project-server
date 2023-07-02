// userRouter.js
const express = require("express");
const userController = require("../controllers/user");
const usersRouter = express.Router();

usersRouter.get("/profile", userController.getUser);
usersRouter.patch("/profile", userController.editUsername);

module.exports = usersRouter;
