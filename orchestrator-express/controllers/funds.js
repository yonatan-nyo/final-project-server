const axios = require("axios");
const { getRedis } = require("../config/redisConfig");
const BUSSINESS_URL = "http://localhost:4002";
const USER_URL = "http://localhost:4001";

class fundController {
  static async fundSuccess(req, res, next) {
    try {
      console.log('masuk siniiiiiii');
      //find UserID
      const redis = getRedis();
      const { data: user } = await axios({
        url: `${USER_URL}/users/profile`,
        method: "GET",
        headers: {
          token: req.headers.token,
        },
      });

      //find BussinessId
      const { slug } = req.params;
      const { data: bussiness } = await axios({
        url: `${BUSSINESS_URL}/bussinesses/${slug}`,
        method: "GET",
      });

      //success funding
      const { amount, PaymentId } = req.body;
      const { data } = await axios.post(`${BUSSINESS_URL}/funds`, {
        amount,
        // PaymentId,
        UserId: user.user._id,
        BussinessId: bussiness._id,
      });

      redis.del("bussinesses");

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = fundController;
