const Redis = require("ioredis");

let redis;

const InitializeRedis = () => {
  redis = new Redis({
    port: 17893,
    host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
    connectTimeout: 10000,
  });
};

const getRedis = () => {
  return redis;
};

module.exports = { getRedis, InitializeRedis };
