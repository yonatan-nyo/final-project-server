const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDef: UserType, resolver: UserResolver } = require("./scheme/users");
const {
  typeDef: PaymentType,
  resolver: PaymentResolver,
} = require("./scheme/payment");

const {
  typeDef: businessTypeDefs,
  resolver: businessResolvers,
} = require("./scheme/business");

const {
  typeDef: fundTypeDefs,
  resolver: fundResolvers,
} = require("./scheme/fund");

const { test } = require("./test/apollo.test");

(async () => {
  // Define Server
  const server = new ApolloServer({
    typeDefs: [UserType, PaymentType,businessTypeDefs,fundTypeDefs],
    resolvers: [UserResolver, PaymentResolver,businessResolvers,fundResolvers],
    introspection: true,
  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);

  // Run Tests
  await test();
})();


