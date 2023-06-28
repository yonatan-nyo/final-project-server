const { getDatabase } = require("../config/connectionMongoDB");
const { ObjectId } = require("mongodb");
const Fund = require("../models/funds");

class fundController {
  static async readAllFunds(req, res, next) {
    try {
      const data = await Fund.findAll();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = fundController;
