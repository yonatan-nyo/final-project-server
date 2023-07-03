const { ObjectId } = require("bson");
const { getDatabase } = require("../config/connectionMongoDB");

class Bussiness {
  static getCollections() {
    const db = getDatabase();
    const bussinesses = db.collection("Bussinesses");
    return bussinesses;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async findBySlug(slug) {
    return this.getCollections().findOne({
      slug,
    });
  }

  static async createBussiness({
    name,
    slug,
    overview,
    brandUrl,
    imagesUrl,
    locations,
    pdfUrl,
    fundNeeded,
    UserId,
    locationDetail,
  }) {
    const findSlug = await this.findBySlug(slug);
    if (slug === findSlug?.slug) throw { msg: "Name taken", statusCode: 400 };
    return this.getCollections().insertOne({
      name,
      slug,
      overview,
      brandUrl,
      imagesUrl,
      locations,
      pdfUrl,
      fundNeeded: +fundNeeded,
      fundReceived: [],
      UserId,
      locationDetail,
    });
  }

  static async findOne(id) {
    console.log("🚀 ~ file: bussinesses.js:51 ~ Bussiness ~ findOne ~ id:=====", id)
    return this.getCollections().findOne({
      _id: new ObjectId(id),
    });
  }

  static async findByUserId(UserId) {
    return this.getCollections().find({ UserId }).toArray();
  }

  static async addFundReceived({ amount, UserId, BussinessId }) {
    console.log(
      { _id: new ObjectId(BussinessId) },
      { $push: { fundReceived: { amount, UserId, BussinessId } } }
    );
    return this.getCollections().updateOne(
      { _id: new ObjectId(BussinessId) },
      { $push: { fundReceived: { amount, UserId, BussinessId } } }
    );
  }
}

module.exports = Bussiness;
