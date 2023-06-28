const { getDatabase } = require("../config/connectionMongoDB");
const { ObjectId } = require("mongodb");
const Fund = require("../models/funds");

class fundController {
  static async readAllFunds(req, res, next) {
    try {
      const data = await Fund.findAll();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  
}

module.exports = fundController;


//db.Bussinesses.insertOne({name:"Flance",slug:"flance",brandUrl:"Flance.com",imagesUrl:["flance1.jp","flance2.jpg"],locations:[{lat:6.2607,lng:106.7817}],pdfUrl:"flance.pdf",fundNeeded:200000000,fundReceived:[20000000,15000000],UserId:"649c1fb2e097160432a50318"})