const axios = require("axios");
const Redis = require("ioredis");
const BUSSINESS_URL = "http://localhost:4002";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDef = `#graphql
type Fund {
  _id: ID!
  PaymentId: String
  UserId: String
  BussinessId: String
}


type Query {
  getFunds: [Fund]
}

`;

const resolver = {
  Query: {
    getFunds: async () => {
      try {
        const dataCache = await redis.get("funds");
        if (dataCache) {
          return JSON.parse(dataCache);
        } else {
          const { data } = await axios.get(`${BUSSINESS_URL}/funds`);

          
          await redis.set("funds", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    
  },

  Mutation: {},
};

module.exports = {
  typeDef,
  resolver,
};
