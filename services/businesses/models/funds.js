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

}

module.exports = Fund;
