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

  static async findBySlug(slug) {
    return this.getCollections().findOne({
      receiver: slug,
    });
  }

  static async createFund({ order_name, token, URL ,amount, UserId, PaymentId, receiver,status}) {
    return this.getCollections().insertOne({
      order_name,
      token,
      URL,
      amount,
      UserId,
      PaymentId,
      receiver,
      status
    });
  }

  static async fundingSuccess(status) {
    return this.getCollections().updateOne({
      status,
    });
  }
}

module.exports = Fund;
