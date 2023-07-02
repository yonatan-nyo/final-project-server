const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose } = require("../config/connectionMongoDB");
const User = require("../models/user");

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await mongoClose();
});

describe("Users", () => {
  // GET all users
  it("GET /users/all", async () => {
    const response = await request(app)
      .get("/users/all")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully fetched all users");
  });

  // Login with valid user data
  it("POST /login", async () => {
    const testUser = {
      username: "TestUser",
      id: "TestId",
      socialMedia: "TestSocialMedia",
    };
    const response = await request(app)
      .post("/login")
      .send(testUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged in successfully");
  });

  // Login with new user data
  it("POST /login with new user data", async () => {
    const testUser = {
      username: "NewTestUser",
      id: "NewTestId",
      socialMedia: "NewTestSocialMedia",
    };
    const response = await request(app)
      .post("/login")
      .send(testUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  // Login with missing username
  it("POST /login with missing username", async () => {
    const testUser = {
      id: "TestId",
      socialMedia: "TestSocialMedia",
    };
    const response = await request(app)
      .post("/login")
      .send(testUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid or missing username");
  });

  // Login with missing socialMedia
  it("POST /login with missing socialMedia", async () => {
    const testUser = {
      username: "TestUser",
      id: "TestId",
    };
    const response = await request(app)
      .post("/login")
      .send(testUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid or missing socialMedia");
  });

  // GET user profile
  it("GET /profile", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Accept", "application/json")
      .set("token", "dasminoi1j2e01dmim012sk.1i2nmismoIJimdsim");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `Successfully fetched profile with ID: ${response.body.user._id}`
    );
  });

  // GET profile without token
  it("GET /profile without token", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Accept", "application/json");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      `Authentication failed. No token provided.`
    );
  });

  // PATCH profile
  it("PATCH /profile", async () => {
    const newUsername = { username: "NewTestUser" };
    const response = await request(app)
      .patch("/profile")
      .send(newUsername)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer your_token_here"); // Replace 'your_token_here' with the valid token
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Profile updated successfully");
  });

  // PATCH profile with invalid username
  it("PATCH /profile with invalid username", async () => {
    const newUsername = { username: 12345 };
    const response = await request(app)
      .patch("/profile")
      .send(newUsername)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer your_token_here"); // Replace 'your_token_here' with the valid token
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid username`);
  });

  // PATCH profile without token
  it("PATCH /profile without token", async () => {
    const newUsername = { username: "NewTestUser" };
    const response = await request(app)
      .patch("/profile")
      .send(newUsername)
      .set("Accept", "application/json");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      `Authentication failed. No token provided.`
    );
  });
});
