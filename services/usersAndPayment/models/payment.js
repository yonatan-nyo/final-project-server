const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connectionMongoDB");

class Payment {
  static getCollections() {
    const db = getDatabase();
    const payments = db.collection("Payments");
    return payments;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

}

module.exports = Payment;
