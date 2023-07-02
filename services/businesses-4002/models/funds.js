const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connectionMongoDB");

class Fund {
  static getCollections() {
    const db = getDatabase();
    const funds = db.collection("Funds");
    return funds;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async findByUserId(UserId) {
    return this.getCollections().find({ UserId }).toArray();
  }

  static async createFund({ PaymentId, amount, UserId, BussinessId }) {
    return this.getCollections().insertOne({
      PaymentId,
      amount,
      UserId,
      BussinessId,
    });
  }
}

module.exports = Fund;
