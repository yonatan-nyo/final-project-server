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
      });
    } catch (err) {
      next(err);
    }
  }

  static async successPayment(req, res, next) {
    try {
      const { amount, UserId, BussinessId } = req.body;
      await Payment.create({ amount, UserId, BussinessId });

      res.status(201).json("Payment succeed");
    } catch (err) {
      next(err);
    }
  }

  static async checkoutStripe(req, res, next) {
    try {
      const session = await Stripe.checkout.session;
    } catch (err) {
      next(err);
    }
  }

  // static async getAllPayments(req, res, next) {
  //   try {
  //     const UserId = req.user._id;

  //     if (!UserId || typeof UserId !== "string" || UserId.trim() === "") {
  //       return res.status(400).json({
  //         message: `Invalid or missing UserId`,
  //       });
  //     }

  //     const payments = await Payment.findByUserId(UserId);

  //     if (payments.length === 0) {
  //       return res.status(404).json({
  //         message: "No payments found for this user",
  //       });
  //     }

  //     res.status(200).json({
  //       message: "Fetched all payments successfully",
  //       payments,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }

  // static async getPaymentById(req, res, next) {
  //   try {
  //     const { id } = req.params;

  //     if (!id || typeof id !== "string" || id.trim() === "") {
  //       return res.status(400).json({
  //         message: `Invalid or missing payment ID`,
  //       });
  //     }

  //     const payment = await Payment.findById(id);

  //     if (!payment) {
  //       return res.status(404).json({
  //         message: "Payment not found",
  //       });
  //     }

  //     res.status(200).json({
  //       message: `Fetched payment with ID: ${id} successfully`,
  //       payment,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }

  // static async deletePayment(req, res, next) {
  //   try {
  //     const { id } = req.params;

  //     if (!id || typeof id !== "string" || id.trim() === "") {
  //       return res.status(400).json({
  //         message: `Invalid or missing payment ID`,
  //       });
  //     }

  //     const result = await Payment.delete(id);

  //     if (!result) {
  //       return res.status(404).json({
  //         message: `No payment found with ID: ${id}`,
  //       });
  //     }

  //     res.status(200).json({
  //       message: `Payment with ID: ${id} deleted successfully`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

module.exports = paymentController;
