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
      const { amount, BussinessId, UserId } = req.body;

      // await Fund.createFund({
      //   // PaymentId,
      //   amount: +amount,
      //   UserId,
      //   BussinessId,
      // });

      // await Bussiness.findOne({ _id: BussinessId });
      // await Bussiness.addFundReceived({
      //   BussinessId,
      //   amount: +amount,
      // });
      // console.log('done anjeng2');
      // res.status(201).json("Payment Success");
    } catch (err) {
      next(err);
    }
  }

  static async getByUserId(req, res, next) {
    try {
      const { UserId } = req.params;
      console.log("🚀 ~ file: funds.js:80 ~ fundController ~ getByUserId ~ UserId:", UserId)
      const data = await Fund.findByUserId(UserId);
      console.log("🚀 ~ file: funds.js:82 ~ fundController ~ getByUserId ~ data:", data)
      if (!data) throw { msg: "Funds not found", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createPaymentStripe(req, res, next) {
    try {
      const { amount } = req.body;

      //Hardcode
      const BussinessId = "649db342bda3ada3ae4a526c"; //ambil dari req.body client
      const UserId = "649c1fb2e097160432a50318";

      const paymentIntent = await stripe.paymentIntents.create({
        amount: +amount,
        currency: "sgd",
        // customer:UserId,
        // description:{
        //   BussinessId
        // },
        // invoice:"TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
        automatic_payment_methods: {
          enabled: true,
        },
      });
      console.log(
        "🚀 ~ file: funds.js:100 ~ fundController ~ createPaymentStripe ~ paymentIntent:",
        paymentIntent
      );

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = fundController;
