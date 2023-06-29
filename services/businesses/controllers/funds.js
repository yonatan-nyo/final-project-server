const { getDatabase } = require("../config/connectionMongoDB");
const { ObjectId } = require("mongodb");
const Fund = require("../models/funds");
const midtransClient = require("midtrans-client");

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

  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await Fund.findBySlug(slug);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  //masih nyoba nyoba aja
  static async createPaymentMidtrans(req, res, next) {
    try {
      const { slug } = req.params;
      const { amount } = req.body;

      // const UserId = await User.findByPk(req.user.id) //based id login
      const UserId = "649c1fb2e097160432a50318";
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000), //harus unique
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          // email: findUser.email,
          UserId,
        },
      };

      const midtrans_token = await snap.createTransaction(parameter);
      
      //database fund pending
      const midtrans_database = await Fund.createFund({
        order_name: parameter.transaction_details.order_id,
        token: midtrans_token.token,
        URL: midtrans_token.redirect_url,
        amount: +amount,
        UserId,
        PaymentId:
          "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
        receiver: slug,
        status: "Pending",
      });
      
      res.status(201).json(midtrans_token);
    } catch (err) {
      next(err);
    }
  }

  static async postSuccess(req, res, next) {
    try {
      const { slug } = req.params;

      const success = await Fund.fundingSuccess(
        { slug },
        { $set: { status: "Paid" } }
      );
      console.log("🚀 ~ file: funds.js:94 ~ fundController ~ postSuccess ~ success:", success)

      res.status(200).json(`Payment success`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = fundController;
