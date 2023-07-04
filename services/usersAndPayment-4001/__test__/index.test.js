const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose } = require("../config/connectionMongoDB");
const User = require("../models/user");
const { signToken, verifyToken } = require("../helpers/jwt");
const Payment = require("../models/payment");

let token = null;
let idFromToken = null;
const INVALID_TOKEN = signToken({ id: "64a011c13a704fb326aa4371" });
const testUserData = {
  username: "NewTestUser",
  id: "64a011c13a704fb326aa4372uhgy",
  socialMedia: "NewTestSocialMedia",
};

beforeAll(async () => {
  await mongoConnect();
  await mongoClose();
  await mongoConnect("UsersAndPaymentTest");
  await User.getCollections().deleteMany();
  await Payment.getCollections().deleteMany();
});

afterAll(async () => {
  await mongoClose();
});

describe("Users", () => {
  describe("POST /login", () => {
    it("new user", async () => {
      const response = await request(app)
        .post("/login")
        .send(testUserData)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully");
      token = response.body.token;
      idFromToken = verifyToken(token).id;
    });

    it("available user", async () => {
      const response = await request(app)
        .post("/login")
        .send(testUserData)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Logged in successfully");
    });

    it("invalid user id", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, id: "akjsd" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toBe("Invalid credentials");
    });

    it("missing id and socialMedia", async () => {
      const testUser = {
        name: "bahaha",
      };
      const response = await request(app)
        .post("/login")
        .send(testUser)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toBe("Invalid credentials");
    });
  });

  it("GET /profile", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Accept", "application/json")
      .set("token", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Successfully fetched profile with ID: ${response.body.user._id}`
    );
  });

  it("GET /profile without token", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Accept", "application/json");
    expect(response.status).toBe(401);
    expect(response.body).toBe("No token Provided");
  });

  it("GET /profile with invalid token", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Accept", "application/json")
      .set("token", INVALID_TOKEN);

    expect(response.status).toBe(401);
    expect(response.body).toBe("User not found");
  });
});

// NEW TEST IS FROM 230 - 312 for ERROR CASE PAYMENT
describe("Payment", () => {
  it("POST /payments/init", async () => {
    const response = await request(app)
      .post("/payments/init")
      .set({ token })
      .send({ amount: 1000, BussinessId: "112asjbd9818kjbs" });

    expect(response.status).toBe(201);
    expect(response.body.BussinessId).toBe("112asjbd9818kjbs");
  });

  it("POST /payments/success", async () => {
    const response = await request(app)
      .post("/payments/success")
      .set({ token })
      .send({
        amount: 90000,
        UserId: idFromToken,
        BussinessId: "112asjbd9818kjbs",
        bussinessName: "uwawawa",
      });
    expect(response.status).toBe(201);
    expect(response.body).toBe("Payment succeed");
  });

  describe("GET /byUser/:UserId", () => {
    it("invalid UserId", async () => {
      const response = await request(app).get(
        `/payments/byUser/${idFromToken}`
      );
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });
});
