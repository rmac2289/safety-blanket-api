const { ApolloServer, gql } = require("apollo-server");
const { departments } = require("./data");

const typeDefs = gql`
  type Department {
    id: ID
    agency: String
    phone: String
    street: String
    city: String
    state: String
    zip: Int
  }

  type Query {
    agencies: [Department]
    agencies_by_city(city: String): [Department]
  }
`;

const resolvers = {
  Query: {
    agencies: () => {
      return departments;
    },
    agencies_by_city: (obj, { city }, context, info) => {
      const matchingAgencies = departments.filter((v) => v.city === city);
      return matchingAgencies;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
