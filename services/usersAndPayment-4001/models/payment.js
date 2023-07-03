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
    return this.getCollections().find({ UserId: userId }).toArray();
  }

  static async create({ amount, UserId, BussinessId }) {
    const result = await this.getCollections().insertOne({
      amount,
      UserId,
      BussinessId,
    });

    return {
      _id: result.insertedId,
      amount,
      UserId,
      BussinessId,
    };
  }

  static async delete(id) {
    return this.getCollections().deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Payment;
