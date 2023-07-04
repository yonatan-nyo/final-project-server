const { convertToSlug } = require("../helpers/covertToSlug");
const Bussiness = require("../models/bussinesses");

class bussinessController {
  static async getAll(req, res, next) {
    try {
      const data = await Bussiness.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getByUserId(req, res, next) {
    try {
      const { UserId } = req.params;

      const data = await Bussiness.findByUserId(UserId);

      res.status(200).json(data);
    } catch (error) {
      next(error);
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

      const data = await Bussiness.findOne(BussinessId);
      if (!data) throw { msg: "Business not found", statusCode: 404 };

      res.status(200).json(data);
    } catch (err) {
      next(err);
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
        locationDetail,
      } = req.body;
      if (
        !name ||
        !overview ||
        !brandUrl ||
        !imagesUrl ||
        !locations ||
        !pdfUrl ||
        !fundNeeded ||
        !UserId ||
        !locationDetail
      ) {
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

      if (!amount || !UserId || !BussinessId) {
        throw { statusCode: 400, msg: "Invalid credentials" };
      }

      await Bussiness.addFundReceived({ amount, UserId, BussinessId });

      res.status(201).json(`Succeed add amount!`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = bussinessController;
