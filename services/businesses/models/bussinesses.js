const { ObjectId } = require("mongodb");
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

  static async createBussiness(input) {
    return this.getCollections().insertOne({
      name: input.name,
      slug: input.slug,
      brandUrl: input.brandUrl,
      imagesUrl: [input.imagesUrl],
      locations: [
        {
          lat: input.locations[0].lat,
          lng: input.locations[0].lng,
        },
      ],
      pdfUrl: input.pdfUrl,
      fundNeeded: +input.fundNeeded,
      fundReceived: [input.fundReceived],
      UserId: input.UserId,
    });
  }
}

module.exports = Bussiness;
