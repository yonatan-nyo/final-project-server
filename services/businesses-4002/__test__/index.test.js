const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoClose, getDatabase } = require("../config/connectionMongoDB");
const Bussiness = require("../models/bussinesses");
const { ObjectId } = require("mongodb");
const { convertToSlug } = require("../helpers/covertToSlug");

const baseBusinessInput = {
  name: "test Name",
  slug: convertToSlug("test Name"),
  overview: "testOverview",
  brandUrl: "https://testBranchUrl.jpg",
  imagesUrl: "https://testImagesUrl.jpg",
  locations: {
    lat: 2.1,
    lng: 3.2,
  },
  locationDetail: "Jl. wiwakwkwk, Jakarta, Indonesia",
  pdfUrl: "https://testPdfYrl.jpg",
  fundNeeded: 900899923,
  UserId: "98123asda7891239asda",
};

const initializeBussiness = baseBusinessInput;

beforeAll(async () => {
  await mongoConnect();
  await getDatabase().collection("Bussinesses").deleteMany();
  const business = await Bussiness.createBussiness(initializeBussiness);
  initializeBussiness._id = new ObjectId(business.insertedId).toString();
  initializeBussiness.fundReceived = [];
});

afterAll(async () => {
  await mongoClose();
});

describe("Bussinesses", () => {
  it("GET /bussinesses", async () => {
    const response = await request(app).get("/bussinesses").set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([initializeBussiness]);
  });

  describe("GET /bussinesses/:slug", () => {
    it("valid slug", async () => {
      const response = await request(app).get(`/bussinesses/${initializeBussiness.slug}`).set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(initializeBussiness);
    });
    it("invalid slug", async () => {
      const response = await request(app).get(`/bussinesses/abasd`).set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body).toEqual("Business not found");
    });
  });

  describe("POST /bussinesses/", () => {
    it("Filled all fields", async () => {
      const response = await request(app)
        .post("/bussinesses")
        .send({ ...baseBusinessInput, name: "test Name Input" })
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toBe("Business test Name Input is created!");
    });
    it("Does not fill any fields", async () => {
      const response = await request(app).post("/bussinesses").set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toBe("Please fill all fields");
    });
  });
});
