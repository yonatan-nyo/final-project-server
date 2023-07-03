const { getDatabase } = require("../config/connectionMongoDB");
const { ObjectId } = require("mongodb");
const Fund = require("../models/funds");
const midtransClient = require("midtrans-client");
const Bussiness = require("../models/bussinesses");
// const stripe = require("stripe", process.env.STRIPE_SECRETKEY);
const stripe = require("stripe")(
  "sk_test_51NPcQ6ISk7K0qdKA0XHk79dwBtsMgn8EzVx3yz9qQuzKFPn7wJN60seom2IjnVJLooeOoI2rcNiUR0B6UZFnh0Tx00yimQFcSp"
);

class fundController {
  static async getByUserId(req, res, next) {
    try {
      const { UserId } = req.params;
      const data = await Fund.findByUserId(UserId);
      if (!data) throw { msg: "Funds not found", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = fundController;
