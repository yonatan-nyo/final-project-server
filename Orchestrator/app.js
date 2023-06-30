const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDef: UserType, resolver: UserResolver } = require("./scheme/users");
const {
  typeDefItem: itemType,
  resolverTtem: itemResolve,
} = require("./scheme/items");

(async () => {
  // Define Server
  const server = new ApolloServer({
    // Jadi typeDefs di sini bisa menerima array
    typeDefs: [UserType, itemType],
    // sama seperti typeDefs, resolvers juga bisa menerima array
    resolvers: [UserResolver, itemResolve],
    // Ini supaya kita tetap bisa membuka explorer sekalipun di production
    introspection: true,
    // (in real case yang digunakan adalah sebagai berikut)
    // introspection: process.env.NODE_ENV !== 'production'
  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
