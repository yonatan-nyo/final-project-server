const { MongoClient } = require("mongodb");

const connectionString = process.env.MONGODB || "mongodb+srv://nafiirfanzidny:yQAc8taMBKVev0Vr@cluster0.qpwboif.mongodb.net";
const client = new MongoClient(connectionString);

let db = null;

const mongoConnect = async () => {
  try {
    await client.connect();
    const database = process.env.NODE_ENV === "test" ? client.db("BusinessTest") : client.db("Business");
    db = database;

    return database;
  } catch (err) {
    console.error(err);
    await client.close();
  }
};

const mongoClose = async () => {
  await client.close();
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
  mongoClose,
};
