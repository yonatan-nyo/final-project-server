const PAYMENT_URL = "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDef = `#graphql
  type Payment {
    _id: ID!
    amount: Float!
    UserId: ID!
    BusinessId: ID!
  }

  type Query {
    getPayment(id: ID!, token: String!): Payment
    getUserPayments(token: String!): [Payment]
  }

  type Mutation {
    createPayment(amount: Float!, BusinessId: ID!, token: String!): Payment
    deletePayment(id: ID!, token: String!): String
  }
`;

const resolver = {
  Query: {
    getPayment: async (_, { id, token }) => {
      const response = await axios.get(`${PAYMENT_URL}/payments/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });

      return response.data.payment;
    },

    getUserPayments: async (_, { token }) => {
      const response = await axios.get(`${PAYMENT_URL}/payments`, {
        headers: {
          authorization: `${token}`,
        },
      });

      return response.data.payments;
    },
  },

  Mutation: {
    createPayment: async (_, { amount, BusinessId, token }) => {
      const response = await axios.post(
        `${PAYMENT_URL}/payments`,
        {
          amount,
          BusinessId,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      return response.data.newPayment;
    },

    deletePayment: async (_, { id, token }) => {
      try {
        const response = await axios.delete(`${PAYMENT_URL}/payments/${id}`, {
          headers: {
            authorization: `${token}`,
          },
        });
        return `Berhasil delete id : ${id}`;
      } catch (error) {
        console.log(error);
        return `Error: ${error.message}`;
      }
    },
  },
};

module.exports = {
  typeDef,
  resolver,
};
