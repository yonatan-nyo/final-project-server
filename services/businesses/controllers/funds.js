const { getDatabase } = require("../config/connectionMongoDB");
const { ObjectId } = require("mongodb");
const Fund = require("../models/funds");
const midtransClient = require("midtrans-client");
const Bussiness = require("../models/bussinesses");

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

  static async createPaymentMidtrans(req, res, next) {
    try {
      const { amount } = req.body;

      //Hardcode
      const BussinessId = "649db342bda3ada3ae4a526c"; //ambil dari req.body client
      const UserId = "649c1fb2e097160432a50318";

      // const UserId = await User.findByPk(req.user.id) //based id login
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

      res.status(201).json({
        redirect_url: midtrans_token.redirect_url,
        token: midtrans_token.token,
        PaymentId: parameter.transaction_details.order_id,
        BussinessId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fundSuccess(req, res, next) {
    try {
      const { amount, PaymentId } = req.body;
      // const { UserId } = req.headers;
      // Hardcode
      const BussinessId = "649fce217acc46cb08dc04e5"; //ambil dari req.body client
      const UserId = "649c1fb2e097160432a50318"; //based yg login
      console.log("🚀 ~ file: funds.js:77 ~ fundController ~ fundSuccess ~ BussinessId:", BussinessId)
      console.log("🚀 ~ file: funds.js:78 ~ fundController ~ fundSuccess ~ UserId:", UserId)
      
      const findBusiness = await Bussiness.findById({
        _id: new ObjectId(`${BussinessId}`),
      })
      console.log("🚀 ~ file: funds.js:88 ~ fundController ~ fundSuccess ~ findBusiness:", findBusiness)


      await Fund.createFund({
        PaymentId,
        amount: +amount,
        UserId,
        BussinessId,
      });

      const addReceivedFund = await Bussiness.fundingSuccess({
        amount,
        BussinessId,
      });
      console.log(
        "🚀 ~ file: funds.js:94 ~ fundController ~ fundSuccess ~ addReceivedFund:",
        addReceivedFund
      );

      res.status(201).json("Payment Success");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = fundController;
