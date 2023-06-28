const Payment = require("../models/payment");

class paymentController {
  static async createPayment(req, res, next) {
    try {
      const { amount, BusinessId } = req.body;
      const UserId = req.user._id;

      const newPayment = await Payment.create({
        amount,
        UserId,
        BusinessId,
      });

      res.status(201).json({
        message: "Payment successfully",
        newPayment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getAllPayments(req, res, next) {
    try {
      const UserId = req.user._id;
      const payments = await Payment.findByUserId(UserId);

      if (payments.length === 0) {
        return res.status(404).json({
          message: "No payments found for this user",
        });
      }

      res.status(200).json({
        message: "Fetched all payments successfully",
        payments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getPaymentById(req, res, next) {
    try {
      const { id } = req.params;

      const payment = await Payment.findById(id);

      if (!payment) {
        return res.status(404).json({
          message: "Payment not found",
        });
      }

      res.status(200).json({
        message: `Fetched payment with ID: ${id} successfully`,
        payment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async deletePayment(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Payment.delete(id);

      if (!result) {
        return res.status(404).json({
          message: `No payment found with ID: ${id}`,
        });
      }

      res.status(200).json({
        message: `Payment with ID: ${id} deleted successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = paymentController;
