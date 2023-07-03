const Payment = require("../models/payment");
const Stripe = require("stripe")(
  "sk_test_51NPcQ6ISk7K0qdKA0XHk79dwBtsMgn8EzVx3yz9qQuzKFPn7wJN60seom2IjnVJLooeOoI2rcNiUR0B6UZFnh0Tx00yimQFcSp"
);

class paymentController {
  static async initializePayment(req, res, next) {
    try {
      const { amount, BussinessId } = req.body;
      const UserId = req.user._id;

      const paymentIntent = await Stripe.paymentIntents.create({
        amount: +amount,
        currency: "sgd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        BussinessId,
        UserId,
        amount,
        paymentIntent
      });
    } catch (err) {
      next(err);
    }
  }

  static async successPayment(req, res, next) {
    try {
      const { amount, UserId, BussinessId,bussinessName } = req.body;
      await Payment.create({ amount, UserId, BussinessId,bussinessName });

      res.status(201).json("Payment succeed");
    } catch (err) {
      next(err);
    }
  }

  static async getByUserId(req, res, next) {
    try {
      const { UserId } = req.params;
      const data = await Payment.findByUserId(UserId);
      if (!data) throw { msg: "Funds not found", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = paymentController;
