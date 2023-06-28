const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/user')


userRouter.get("/", userController.readAllUsers);

module.exports = userRouter;