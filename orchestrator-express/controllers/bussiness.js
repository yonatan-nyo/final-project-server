const axios = require("axios");
const Redis = require("ioredis");
const BUSSINESS_URL = "http://localhost:4002";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

class bussinessController {
  static async getAll(req, res, next) {
    try {
      const dataCache = await redis.get("bussinesses");
      if (dataCache) {
        const result = JSON.parse(dataCache);
        return res.status(200).json(result);
      }

      const { data } = await axios.get(`${BUSSINESS_URL}/bussinesses`);

      redis.set("bussinesses", JSON.stringify(data));

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { data } = await axios.get(`${BUSSINESS_URL}/bussinesses/` + slug);

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async post(req, res, next) {
    try {
      
      const {
        name,
        overview,
        brandUrl,
        imagesUrl,
        locations,
        pdfUrl,
        fundNeeded,
        UserId,
      } = req.body;

      const { data } = await axios.post(`${BUSSINESS_URL}/bussinesses`, {
        name,
        overview,
        brandUrl,
        imagesUrl,
        locations,
        pdfUrl,
        fundNeeded,
        UserId,
      });

      redis.del("bussinesses");

      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = bussinessController;
