const { getDatabase } = require("../config/connectionMongoDB");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async getById(id) {
    return this.getCollections().findOne({ _id: id });
  }

  static async create({ username, id, socialMedia }) {
    const result = await this.getCollections().insertOne({
      _id: id,
      username,
      socialMedia,
    });

    const insertedUser = await this.getCollections().findOne({
      _id: result.insertedId,
    });
    return insertedUser;
  }
}

module.exports = User;
