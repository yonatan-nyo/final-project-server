const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/connectionMongoDB");

class User {
  static getCollections() {
    const db = getDatabase();
    // console.log(String(db));
    const users = db.collection("Users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async getById(id) {
    return this.getCollections().findOne({ _id: new ObjectId(id) });
  }

  static async create({ username, email, socialMedia }) {
    const result = await this.getCollections().insertOne({
      username,
      email,
      socialMedia,
    });

    if (result.acknowledged && result.insertedId) {
      const insertedUser = await this.getCollections().findOne({
        _id: result.insertedId,
      });
      return insertedUser;
    } else {
      throw new Error("Failed to create user");
    }
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
