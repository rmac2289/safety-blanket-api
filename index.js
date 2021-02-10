const { ApolloServer } = require("apollo-server");
const { merge } = require("lodash");
require("dotenv").config();
require("./config");
const { typeDefs: agency } = require("./src/agency");
const { typeDefs: user } = require("./src/user");
const { typeDefs: query, resolvers: queries } = require("./src/query");
const { typeDefs: mutation, resolvers: mutations } = require("./src/mutation");

const server = new ApolloServer({
  typeDefs: [agency, query, mutation, user],
  resolvers: merge(queries, mutations),
  introspection: true,
  playground: true,
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`);
  });
