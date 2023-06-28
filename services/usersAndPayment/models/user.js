const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connectionMongoDB");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

}

module.exports = User;
