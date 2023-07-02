const axios = require("axios");
const USER_URL = "http://localhost:4001";

class PaymentController {
  static async getPayment(req, res) {
    try {
      const { id } = req.params;
      const { token } = req.headers;

      const response = await axios.get(`${USER_URL}/payments/${id}`, {
        headers: {
          token,
        },
      });

      res.status(response.status).json(response.data.payment);
    } catch (error) {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
    }
  }

  static async getUserPayments(req, res) {
    try {
      const { token } = req.headers;

      const response = await axios.get(`${USER_URL}/payments`, {
        headers: {
          token,
        },
      });

      res.status(response.status).json(response.data.payments);
    } catch (error) {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
    }
  }

  static async createPayment(req, res) {
    try {
      const { amount, BusinessId } = req.body;
      const { token } = req.headers;

      const response = await axios.post(
        `${USER_URL}/payments`,
        {
          amount,
          BusinessId,
        },
        {
          headers: {
            token,
          },
        }
      );

      res.status(response.status).json(response.data.newPayment);
    } catch (error) {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
    }
  }

  static async deletePayment(req, res) {
    try {
      const { id } = req.params;
      const { token } = req.headers;

      await axios.delete(`${USER_URL}/payments/${id}`, {
        headers: {
          token,
        },
      });

      res.json(`Successfully deleted payment with id: ${id}`);
    } catch (error) {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
    }
  }
}

module.exports = PaymentController;
