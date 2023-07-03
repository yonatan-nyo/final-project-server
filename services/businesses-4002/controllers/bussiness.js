const { convertToSlug } = require("../helpers/covertToSlug");
const Bussiness = require("../models/bussinesses");

class bussinessController {
  static async getAll(req, res, next) {
    const data = await Bussiness.findAll();

    res.status(200).json(data);
  }

  static async getByUserId(req, res, next) {
    try {
      const { UserId } = req.params;
      const data = await Bussiness.findByUserId(UserId);
      if (!data) throw { msg: "No business found for this user", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await Bussiness.findBySlug(slug);
      if (!data) throw { msg: "Business not found", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { BussinessId } = req.params;
      console.log("🚀 ~ file: bussiness.js:39 ~ bussinessController ~ getById ~ BussinessId:", BussinessId);
      const data = await Bussiness.findOne(BussinessId);
      console.log(99999999, data, "data cok");
      if (!data) throw { msg: "Business not found", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async post(req, res, next) {
    try {
      const { name, overview, brandUrl, imagesUrl, locations, pdfUrl, fundNeeded, UserId, locationDetail } = req.body;
      if (!name || !overview || !brandUrl || !imagesUrl || !locations || !pdfUrl || !fundNeeded || !UserId || !locationDetail) {
        throw { msg: "Please fill all fields", statusCode: 400 };
      }
      const slug = convertToSlug(name);

      await Bussiness.createBussiness({
        name,
        slug,
        overview,
        brandUrl,
        imagesUrl,
        locations: locations.split(","),
        pdfUrl,
        fundNeeded,
        UserId,
        locationDetail,
      });

      res.status(201).json(`Business ${name} is created!`);
    } catch (err) {
      next(err);
    }
  }

  static async patchFunds(req, res, next) {
    try {
      const { amount, UserId, BussinessId } = req.body;

      await Bussiness.addFundReceived({ amount, UserId, BussinessId });

      res.status(201).json(`Succeed add amount!`);
    } catch (error) {
      next(err);
    }
  }
}

module.exports = bussinessController;
