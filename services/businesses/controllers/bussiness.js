const { convertToSlug } = require("../helpers/covertToSlug");
const Bussiness = require("../models/bussinesses");
const Fund = require("../models/funds");


class bussinessController {
  static async getAll(req, res, next) {
    try {
      const data = await Bussiness.findAll();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await Bussiness.findBySlug(slug);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async post(req, res, next) {
    try {
      const {
        name,
        brandUrl,
        imagesUrl,
        locations,
        pdfUrl,
        fundNeeded,
        UserId,
      } = req.body;
      const slug = convertToSlug(name);

      // const t = await sequelize.transaction();
      await Bussiness.createBussiness(
        {
          name,
          slug,
          brandUrl,
          imagesUrl,
          locations,
          pdfUrl,
          fundNeeded,
          UserId, //req.user.id :diambil dari ID login
        }
      );

      

      res.status(201).json(`Business ${name} is created!`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = bussinessController;
