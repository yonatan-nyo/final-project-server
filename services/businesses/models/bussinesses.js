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

  static async createBussiness({ name, slug, brandUrl, imagesUrl, locations, pdfUrl, fundNeeded, UserId }) {
    return this.getCollections().insertOne({
      name,
      slug,
      brandUrl,
      imagesUrl,
      locations,
      pdfUrl,
      fundNeeded: +fundNeeded,
      fundReceived: [],
      UserId,
    });
  }
}

module.exports = Bussiness;
