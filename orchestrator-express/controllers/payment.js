const axios = require("axios");
const { getRedis } = require("../config/redisConfig");
const USER_URL = "http://localhost:4001";
const BUSSINESS_URL = "http://localhost:4002";

class PaymentController {
  static async initializeStripe(req, res) {
    try {
      const { token } = req.headers;
      const { BussinessId, amount } = req.body;

      //passing token ke service user
      const { data } = await axios({
        url: `${USER_URL}/payments/init`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          amount,
          BussinessId,
        },
      });

      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "An error occurred while processing your request" });
      }
    }
  }

  static async paymentSuccess(req, res, next) {
    try {
      console.log("masuk siniiiiiii");
      console.log(req.body);

      const {
        detail: { amount, UserId, BussinessId },
        slug,
      } = req.body;
      //find UserID
      const redis = getRedis();
      const { data: user } = await axios({
        url: `${USER_URL}/users/profile`,
        method: "GET",
        headers: {
          token: req.headers.token,
        },
      });

      console.log("tes================");
      const {
        data: { name: bussinessName },
      } = await axios({
        url: `${BUSSINESS_URL}/bussinesses/find/` + BussinessId,
        method: "GET",
      });
      console.log(bussinessName, "name anjay ");

      //add payment to user
      await axios({
        url: `${USER_URL}/payments/success`,
        method: "POST",
        headers: {
          token: req.headers.token,
        },
        data: {
          amount,
          UserId,
          BussinessId,
          bussinessName: bussinessName,
        },
      });

      //patch fundReceived business
      const { data } = await axios({
        url: `${BUSSINESS_URL}/bussinesses/fund`,
        method: "patch",
        headers: {
          token: req.headers.token,
        },
        data: {
          amount,
          UserId,
          BussinessId,
        },
      });
      console.log(data);

      res.status(201).json("Payment success");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;
