const { ObjectId } = require("bson");
const { getDatabase } = require("../config/connectionMongoDB");
const nodemailer = require("nodemailer");

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

  static async findOne(id) {
    console.log(
      "🚀 ~ file: bussinesses.js:51 ~ Bussiness ~ findOne ~ id:=====",
      id
    );
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

    const curBussinesses = await Bussiness.findOne(BussinessId);
    console.log(
      "🚀 ~ file: bussinesses.js:69 ~ Bussiness ~ addFundReceived ~ tes:==============",
      curBussinesses.fundReceived.length
    );

    if (curBussinesses.fundReceived.length === 40) {
      async function main(email) {
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "kobonagara@gmail.com",
            pass: "czwzkvtwwbftzgjo",
          },
        });
        let detail = {
          from: '"Invest Mate" <nafiirfanzidny00@gmail.com>', // sender address
          to: "nafiirfanzidny@gmail.com", // list of receivers
          subject: "Prepare for invest!", // Subject line
          text: "Selamat Kuota Investor sudah terpenuhi sebanyak 40 orang. Kami akan memberikan Informasi lebih lanjut untuk tempat dan jadwal pertemuan dalam maksimal 2x24 jam ", // plain text body
        };
        mailTransporter.sendMail(detail, () => {});
      }
      await main();
    }

    return this.getCollections().updateOne(
      { _id: new ObjectId(BussinessId) },
      { $push: { fundReceived: { amount, UserId, BussinessId } } }
    );
  }
}

module.exports = Bussiness;
