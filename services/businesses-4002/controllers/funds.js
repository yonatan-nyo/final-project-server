const Fund = require("../models/funds");

class fundController {
  static async getByUserId(req, res, next) {
    try {
      const { UserId } = req.params;
      const data = await Fund.findByUserId(UserId);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = fundController;
