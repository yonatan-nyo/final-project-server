const { convertToSlug } = require("../helpers/covertToSlug");
const Bussiness = require("../models/bussinesses");

class bussinessController {
  static async readAllBussinesses(req, res, next) {
    try {
      const data = await Bussiness.findAll();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getBussiness(req, res, next) {
    try {
      const { slug } = req.params;
      const data = await Bussiness.findBySlug(slug);

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async addBussiness(req, res, next) {
    try {
      const {
        name,
        brandUrl,
        imagesUrl,
        lat,
        lng,
        pdfUrl,
        fundNeeded,
        UserId,
      } = req.body;

      const slug = convertToSlug(name)

      const newBussiness = await Bussiness.createBussiness({
        name,
        slug,
        brandUrl,
        imagesUrl:[imagesUrl],
        locations: [{
          lat:+lat,
          lng:+lng
        }],
        pdfUrl,
        fundNeeded:+fundNeeded,
        fundReceived:0,
        UserId
      })
      
      res.status(201).json({
        message:"Created",
        name,
        slug,
        brandUrl,
        imagesUrl:[imagesUrl],
        locations:[{
          lat:+lat,
          lng:+lng
        }],
        pdfUrl,
        fundNeeded:+fundNeeded,
        fundReceived:[0],
        UserId,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = bussinessController;
