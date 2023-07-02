const axios = require("axios");
const Redis = require("ioredis");
const BUSSINESS_URL = "http://localhost:4002";
const USER_URL = "http://localhost:4001";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

class fundController {
  static async fundSuccess(req, res, next) {
    try {
      //find UserID
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
        PaymentId,
        UserId: user.user._id,
        BussinessId:bussiness._id,
      });

      redis.del("funds");

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = fundController;
