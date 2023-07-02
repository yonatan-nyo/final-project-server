require("dotenv").config();
const { mongoConnect } = require("../config/connectionMongoDB");
const port = process.env.PORT || 4001;
const app = require("../app");

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`Services-Bussinesses is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
