const { MongoClient } = require("mongodb");

const connectionString =
  process.env.MONGODB ||
<<<<<<< HEAD:services/usersAndPayment-4001/config/connectionMongoDB.js
  "mongodb+srv://nafiirfanzidny:yQAc8taMBKVev0Vr@cluster0.qpwboif.mongodb.net";
=======
  "mongodb://127.0.0.1:27017";
>>>>>>> orchestrator-express:services/businesses/config/connectionMongoDB.js

let db = null;

const mongoConnect = async () => {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();
    const database = client.db("usersAndPayment");
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
