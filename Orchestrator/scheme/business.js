const axios = require("axios");
const Redis = require("ioredis");
const BUSSINESS_URL = "http://localhost:4002";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDef = `#graphql
type Bussiness {
  _id: ID!
  name: String
  slug: String
  overview: String
  brandUrl: String
  imagesUrl: [String]
  locations: [locations]
  pdfUrl: String
  fundNeeded: Int
  fundReceived: [Int]
  UserId: String
}

type locations {
  lat: String
  lng: String
}

type Query {
  getBussinesses: [Bussiness]
  getBussiness(slug: String!): Bussiness
}

`;

const resolver = {
  Query: {
    getBussinesses: async () => {
      try {
        const dataCache = await redis.get("bussinesses");
        if (dataCache) {
          return JSON.parse(dataCache);
        } else {
          const { data } = await axios.get(`${BUSSINESS_URL}/bussinesses`);

          console.log(
            "🚀 ~ file: business.js:47 ~ getBussinesses: ~ data:",
            data
          );
          await redis.set("bussinesses", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    getBussiness: async (_, args) => {
      try {
        const { slug } = args;
        const { data } = await axios.get(`${BUSSINESS_URL}/bussinesses/${slug}`);
       

        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },

  Mutation: {},
};

module.exports = {
  typeDef,
  resolver,
};
