const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose } = require("../config/connectionMongoDB");
const Bussiness = require("../models/bussinesses");

const initializeBussiness = {
  name: "",
  slug: "",
  overview: "",
  brandUrl: "",
  imagesUrl: "",
  locations: "",
  pdfUrl: "",
  fundNeeded: "",
  UserId: "",
};

beforeAll(async () => {
  await mongoConnect();
  Bussiness.createBussiness(initializeBussiness);
});

afterAll(async () => {
  await mongoClose();
});

describe("Bussinesses", () => {
  it("GET /bussinesses", async () => {
    const response = await request(app).get("/bussinesses").set("Accept", "application/json");
    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([initializeBussiness]);
  });
  it("GET /bussinesses/:slug", async () => {
    // const response = await request(app).get("/bussinesses").set("Accept", "application/json");
    // console.log(response);
    // expect(response.status).toBe(200);
  });
  it("POST /bussinesses/", async () => {
    // const response = await request(app).get("/bussinesses").set("Accept", "application/json");
    // console.log(response);
    // expect(response.status).toBe(200);
  });
});
