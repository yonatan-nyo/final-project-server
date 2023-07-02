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
    const findSlug = await this.findBySlug(slug)
    if(slug === findSlug?.slug) throw {msg:'Name taken',statusCode:400}
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
    return this.getCollections().findOne({
      _id:new ObjectId(id._id),
    });
  }

  static async addFundReceived(input) {
    const bussiness = await this.findOne({ _id: input.BussinessId })
    const findId = bussiness._id
    return this.getCollections().updateOne({_id:findId},{$push:{fundReceived:input.amount}});
  }
}

module.exports = Bussiness;
