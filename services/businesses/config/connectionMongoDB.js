const { MongoClient } = require("mongodb");

const connectionString = process.env.MONGODB || "mongodb+srv://nafiirfanzidny:yQAc8taMBKVev0Vr@cluster0.qpwboif.mongodb.net";

let db = null;

const mongoConnect = async () => {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();

    console.log(client);
    const database = client.db("Bussiness");
    db = database;
    return database;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
