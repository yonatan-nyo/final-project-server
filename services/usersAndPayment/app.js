const cors = require("cors");
const express = require("express");
const { mongoConnect } = require("./config/connectionMongoDB");
const userRouter = require("./routers/users");
const routerPayment = require("./routers/payments");
const loginRouter = require("./routers/login");
const app = express();

const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/payments", routerPayment);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) =>
      console.log(`Services-UsersAndPayment is listening at port ${port}`)
    );
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
