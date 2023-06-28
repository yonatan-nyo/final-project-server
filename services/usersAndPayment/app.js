const cors = require("cors");
const express = require("express");
const {mongoConnect} = require("./config/connectionMongoDB");
const userRouter = require("./routers/users");
const routerPayment = require("./routers/payments");
const app = express();

const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/users", userRouter);
app.use("/payments", routerPayment);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`Services-Users is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
