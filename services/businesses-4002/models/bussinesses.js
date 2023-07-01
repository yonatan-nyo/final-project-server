const { getDatabase } = require("../config/connectionMongoDB");
const ObjectId = require("mongodb").ObjectId;

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

  static async fundingSuccess({ amount, BussinessId }) {
    const query = {
      _id: new ObjectId(`${BussinessId}`),
    };

    const update = {
      $push: {
        fundReceived: +amount,
      },
    };

    return this.getCollections().updateOne(query, update);
  }
}

module.exports = Bussiness;
