const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose } = require("../config/connectionMongoDB");
const User = require("../models/user");
const { signToken } = require("../helpers/jwt");

let token = null;
const INVALID_TOKEN = signToken({ id: "64a011c13a704fb326aa4371" });

beforeAll(async () => {
  await mongoConnect();
  await mongoClose();
  await mongoConnect("usersAndPaymentTest");
  await User.getCollections().deleteMany();
});

afterAll(async () => {
  await mongoClose();
});

describe("Users", () => {
  describe("POST /login", () => {
    const testUserData = {
      username: "NewTestUser",
      id: "64a011c13a704fb326aa4372uhgy",
      socialMedia: "NewTestSocialMedia",
    };

    it("new user", async () => {
      const response = await request(app)
        .post("/login")
        .send(testUserData)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully");
      token = response.body.token;
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
    // NEW TEST IS FROM 72 - 154 for ERROR CASE LOGIN
    // Sending no request body
    it("no request body", async () => {
      const response = await request(app)
        .post("/login")
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Sending non-string id
    it("non-string id", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, id: 123456 })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Sending empty string id
    it("empty string id", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, id: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Sending non-string username
    it("non-string username", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, username: 123456 })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Sending empty string username
    it("empty string username", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, username: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Sending non-string socialMedia
    it("non-string socialMedia", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, socialMedia: 123456 })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Sending empty string socialMedia
    it("empty string socialMedia", async () => {
      const response = await request(app)
        .post("/login")
        .send({ ...testUserData, socialMedia: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
    });

    // Invalid credentials
    it("invalid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "invalid",
          id: "64a011c13a704fb326aa4372uhgy",
          socialMedia: "NewTestSocialMedia",
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toBe("Invalid credentials");
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

  // PATCH profile
  it("PATCH /profile", async () => {
    const newUsername = { username: "NewTestUsera" };
    const response = await request(app)
      .patch("/users/profile")
      .send(newUsername)
      .set("Accept", "application/json")
      .set("token", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Successfully updated username of ID: 64a011c13a704fb326aa4372uhgy from NewTestUser to NewTestUsera"
    );
  });

  // PATCH profile with invalid username
  it("PATCH /profile with invalid username", async () => {
    const newUsername = { username: 12345 };
    const response = await request(app)
      .patch("/users/profile")
      .send(newUsername)
      .set("Accept", "application/json")
      .set("token", token);

    expect(response.status).toBe(400);
    expect(response.body).toBe(`Invalid or missing username`);
  });

  // PATCH profile without token
  it("PATCH /profile without token", async () => {
    const newUsername = { username: "NewTestUsera" };
    const response = await request(app)
      .patch("/users/profile")
      .send(newUsername)
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toBe("No token Provided");
  });
});

// NEW TEST IS FROM 230 - 312 for ERROR CASE PAYMENT
describe("Payment", () => {
  describe("POST /init", () => {
    it("missing amount", async () => {
      const response = await request(app)
        .post("payments/init")
        .send({ BussinessId: "123456" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Amount is required");
    });

    it("invalid amount", async () => {
      const response = await request(app)
        .post("payments/init")
        .send({ amount: "abc", BussinessId: "123456" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid amount");
    });

    it("missing BussinessId", async () => {
      const response = await request(app)
        .post("payments/init")
        .send({ amount: 1000 });
      expect(response.status).toBe(400);
      expect(response.text).toBe("BussinessId is required");
    });

    it("invalid BussinessId", async () => {
      const response = await request(app)
        .post("payments/init")
        .send({ amount: 1000, BussinessId: 123456 });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid BussinessId");
    });
  });

  describe("POST /success", () => {
    it("missing amount", async () => {
      const response = await request(app)
        .post("payments/success")
        .send({ UserId: "123456", BussinessId: "123456" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Amount is required");
    });

    it("invalid amount", async () => {
      const response = await request(app)
        .post("payments/success")
        .send({ amount: "abc", UserId: "123456", BussinessId: "123456" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid amount");
    });

    it("missing UserId", async () => {
      const response = await request(app)
        .post("payments/success")
        .send({ amount: 1000, BussinessId: "123456" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("UserId is required");
    });

    it("invalid UserId", async () => {
      const response = await request(app)
        .post("payments/success")
        .send({ amount: 1000, UserId: 123456, BussinessId: "123456" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid UserId");
    });
  });

  describe("GET /byUser/:UserId", () => {
    it("missing UserId", async () => {
      const response = await request(app).get("payments/byUser/");
      expect(response.status).toBe(400);
      expect(response.text).toBe("UserId is required");
    });

    it("invalid UserId", async () => {
      const response = await request(app).get("payments/byUser/123456");
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid UserId");
    });
  });
});
