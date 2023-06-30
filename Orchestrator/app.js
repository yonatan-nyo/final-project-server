const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDef: UserType, resolver: UserResolver } = require("./scheme/users");
const {
  typeDef: PaymentType,
  resolver: PaymentResolver,
} = require("./scheme/payment");

(async () => {
  // Define Server
  const server = new ApolloServer({
    typeDefs: [UserType, PaymentType],
    resolvers: [UserResolver, PaymentResolver],
    introspection: true,
  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
