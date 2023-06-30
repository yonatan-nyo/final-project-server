// test file
const { createServer } = require("../app");
const request = require("supertest");

const queryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: "world" },
};

describe("e2e demo", () => {
  let server, url;

  beforeAll(async () => {
    server = createServer();
    const { url: serverUrl } = await server.listen({ port: 4000 });
    url = serverUrl; // Pastikan server Anda mengembalikan objek dengan properti `url`
  });

  afterAll(async () => {
    await server.stop();
  });

  it("says hello", async () => {
    const response = await request(url).post("/").send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe("Hello world!");
  });
});
