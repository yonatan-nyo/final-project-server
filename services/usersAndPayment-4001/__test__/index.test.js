const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose } = require("../config/connectionMongoDB");

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await mongoClose();
});

describe("login", () => {
  describe("POST /login", () => {
    it("filled all inputs", async () => {
      // do something
    });
    it("does not fill any input", async () => {
      // do something
    });
  });
});

describe("users", () => {
  describe("GET /profile", () => {
    it("with token", () => {
      // do something
    });
    it("without token", () => {
      // do something
    });
  });
  describe("PATCH /profile", () => {
    //tambahin ntr
    it("with token", () => {
      // do something
    });
    it("without token", () => {
      // do something
    });
  });
});
