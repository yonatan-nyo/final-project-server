const { ApolloServer } = require("@apollo/server");

const { typeDef: UserType, resolver: UserResolver } = require("./scheme/users");
const {
  typeDef: PaymentType,
  resolver: PaymentResolver,
} = require("./scheme/payment");

const createServer = () => {
  // Define Server
  const server = new ApolloServer({
    typeDefs: [UserType, PaymentType],
    resolvers: [UserResolver, PaymentResolver],
    introspection: true,
  });

  return server;
};

// Only run the server if this file is run directly (i.e., not when imported as a module in a test environment)
if (require.main === module) {
  const { startStandaloneServer } = require("@apollo/server/standalone");
  (async () => {
    const server = createServer();
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  })();
}

module.exports = {
  createServer,
};
