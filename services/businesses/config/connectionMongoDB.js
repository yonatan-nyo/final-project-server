const { MongoClient } = require("mongodb");

const connectionString =
  process.env.MONGODB ||
  "mongodb://127.0.0.1:27017";

let db = null;

const mongoConnect = async () => {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();
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
