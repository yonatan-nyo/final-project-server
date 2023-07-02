const axios = require("axios");
const Redis = require("ioredis");
const BUSSINESS_URL = "http://localhost:4002";
const USER_URL = "http://localhost:4001";

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
      next(err);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { data } = await axios.get(`${BUSSINESS_URL}/bussinesses/` + slug);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async post(req, res, next) {
    try {
      const { data: user } = await axios({
        url: `${USER_URL}/users/profile`,
        method: "GET",
        headers: {
          token:req.headers.token,
        },
      });

      const {
        name,
        overview,
        brandUrl,
        imagesUrl,
        locations,
        pdfUrl,
        fundNeeded,
        locationDetail,
      } = req.body;

      const { data } = await axios.post(`${BUSSINESS_URL}/bussinesses`, {
        name,
        overview,
        brandUrl,
        imagesUrl,
        locations,
        pdfUrl,
        fundNeeded,
        UserId:user.user._id,
        locationDetail,
      });

      redis.del("bussinesses");

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = bussinessController;
