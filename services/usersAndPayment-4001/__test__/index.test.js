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
      const response = await request(app).post("/login").send(testUserData).set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully");
      token = response.body.token;
    });

    it("available user", async () => {
      const response = await request(app).post("/login").send(testUserData).set("Accept", "application/json");

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
      const response = await request(app).post("/login").send(testUser).set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toBe("Invalid credentials");
    });
  });

  it("GET /profile", async () => {
    const response = await request(app).get("/users/profile").set("Accept", "application/json").set("token", token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Successfully fetched profile with ID: ${response.body.user._id}`);
  });

  it("GET /profile without token", async () => {
    const response = await request(app).get("/users/profile").set("Accept", "application/json");
    expect(response.status).toBe(401);
    expect(response.body).toBe("No token Provided");
  });

  it("GET /profile with invalid token", async () => {
    const response = await request(app).get("/users/profile").set("Accept", "application/json").set("token", INVALID_TOKEN);

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
    const response = await request(app).patch("/users/profile").send(newUsername).set("Accept", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toBe("No token Provided");
  });
});
