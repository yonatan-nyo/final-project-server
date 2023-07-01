const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose } = require("../config/connectionMongoDB");

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await mongoClose();
});

describe("Bussinesses", () => {
  it("get /bussinesses", async () => {
    const response = await request(app).get("/bussinesses").set("Accept", "application/json");
    console.log(response);

    expect(response.status).toBe(200);
  });
});
