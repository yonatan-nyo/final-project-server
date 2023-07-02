const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://investmate-b8a3b.appspot.com",
  });
};

module.exports = { admin, initialize };
