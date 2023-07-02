const USER_URL = "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    socialMedia: String
  }

  type Query {
    getUser(token: String!): User
    getUsers: [User]
  }

  type Mutation {
    loginUser(username: String!, email: String!, socialMedia: String): String
    editUsername(username: String!, token: String!): User
  }
`;

const resolver = {
  Query: {
    getUser: async (_, { token }) => {
      const response = await axios.get(`${USER_URL}/users/profile`, {
        headers: {
          authorization: `${token}`,
        },
      });

      return response.data.user;
    },

    getUsers: async () => {
      const data = await redis.get("usersss");
      if (data) {
        return JSON.parse(data);
      }

      const response = await axios.get(`${USER_URL}/users/all`);
      await redis.set("usersss", JSON.stringify(response.data.data));
      return response.data.data;
    },
  },

  Mutation: {
    loginUser: async (_, { username, email, socialMedia }) => {
      const response = await axios.post(`${USER_URL}/login`, {
        username,
        email,
        socialMedia,
      });
      return response.data.token;
    },

    editUsername: async (_, { username, token }) => {
      const response = await axios.patch(
        `${USER_URL}/users/profile`,
        {
          username,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      return response.data.updatedUser;
    },
  },
};

module.exports = {
  typeDef,
  resolver,
};
