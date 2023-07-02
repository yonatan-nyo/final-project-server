const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connectionMongoDB");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async getById(id) {
    return this.getCollections().findOne({ _id: new ObjectId(id) });
  }

  static async create({ username, id, socialMedia }) {
    const result = await this.getCollections().insertOne({
      _id: new ObjectId(id),
      username,
      socialMedia,
    });

    const insertedUser = await this.getCollections().findOne({
      _id: result.insertedId,
    });
    return insertedUser;
  }

  static async edit(id, username) {
    const updatedUser = await this.getCollections().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { username: username } },
      { returnOriginal: false }
    );

    return updatedUser.value;
  }
}

module.exports = User;
