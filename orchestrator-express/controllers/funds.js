const axios = require("axios");
const Redis = require("ioredis");
const BUSSINESS_URL = "http://localhost:4002";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

class fundController {
  static async readAllFunds(req, res, next) {
    try {
      const dataCache = await redis.get("funds");
      if (dataCache) {
        const result = JSON.parse(dataCache);
        return res.status(200).json(result);
      }

      const { data } = await axios.get(`${BUSSINESS_URL}/funds`);

      redis.set("funds", JSON.stringify(data));

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async fundSuccess(req, res, next) {
    try {
      const { amount, PaymentId } = req.body;

      const { data } = await axios.post(`${BUSSINESS_URL}/funds`, {
        amount,
        PaymentId,
      });

      redis.del("funds");

      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = fundController;
