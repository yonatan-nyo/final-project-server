const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDef = `#graphql
 
`;

const resolver = {
  Query: {},

  Mutation: {},
};

module.exports = {
  typeDef,
  resolver,
};
