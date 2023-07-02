const { MongoClient } = require("mongodb");

const connectionString = process.env.MONGODB;
const client = new MongoClient(connectionString);

let db = null;

const mongoConnect = async (database = "usersAndPayment") => {
  await client.connect();
  db = client.db(database);
  return database;
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
