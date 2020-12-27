const { ApolloServer, gql } = require("apollo-server");
const { departments } = require("./data");
require("dotenv").config();
require("./config");
const { Agency } = require("./models");

const typeDefs = gql`
  type Agency {
    id: ID
    agency: String
    phone: String
    street: String
    city: String
    state: String
    zip: Int
  }

  type Query {
    agencies: [Agency]
    agencies_by_city(city: String, county: String): [Agency]
  }
  type Mutation {
    addAgencies(
      agency: String!
      phone: String!
      street: String!
      city: String!
      state: String!
      zip: Int!
    ): Agency
  }
`;

const resolvers = {
  Query: {
    agencies: async () => await Agency.find({}).exec(),
  },
  //   agencies_by_city: (obj, { city, county }, context, info) => {
  //     const matchingAgencies = departments.filter(
  //       (v) =>
  //         v.city === city ||
  //         (v.agency.includes(county) && !v.agency.includes("("))
  //     );
  //     return matchingAgencies;
  //   },
  //   Mutation: {
  //     addAgencies: async () => {
  //       try {
  //         return departments.map(async (v) => {
  //           return await Agency.create(v);
  //         });
  //         // let response = await Agency.create(departments);
  //         // console.log(departments);
  //         // return response;
  //       } catch (error) {
  //         return error.message;
  //       }
  //     },
  //   },
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
