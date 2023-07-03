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

  static async findById(id) {
    return this.getCollections().findOne({ _id: new ObjectId(id) });
  }

  static async findByUserId(userId) {
    console.log("🚀 ~ file: payment.js:20 ~ Payment ~ findByUserId ~ userId:", userId)
    return this.getCollections().find({ UserId: userId }).toArray();
  }

  static async create({ amount, UserId, BussinessId,bussinessName }) {
    const result = await this.getCollections().insertOne({
      amount,
      UserId,
      BussinessId,
      bussinessName
    });

    return {
      _id: result.insertedId,
      amount,
      UserId,
      BussinessId,
      bussinessName
    };
  }

  static async delete(id) {
    return this.getCollections().deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Payment;
