const cors = require("cors");
const express = require("express");
const {mongoConnect} = require("./config/connectionMongoDB");
const bussinessRouter = require("./routers/bussiness");
const fundRouter = require("./routers/fund");
const app = express();

const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/bussinesses", bussinessRouter);
app.use("/funds", fundRouter);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`Services-Bussinesses is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();