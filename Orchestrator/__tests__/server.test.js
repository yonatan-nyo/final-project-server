// test file
const { createServer } = require("../app");
const request = require("supertest");
const Redis = require("ioredis"); // Import redis module

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
}); // Initialize the redis client

const queryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: "world" },
};

describe("e2e demo", () => {
  let server, url, httpServer;

  beforeAll(async () => {
    server = createServer();
    httpServer = await server.listen({ port: 4000 }); // ApolloServer instance doesn't have a `listen` method.
    url = httpServer.url; // Make sure your server returns an object with a `url` property
  });

  afterAll(async () => {
    await httpServer.stop(); // Here we stop the httpServer, not the ApolloServer
    await redis.disconnect(); // Disconnect from redis after each test
  });

  it("says hello", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe("Hello world!");
  });
});
