const { gql } = require("apollo-server");
const { Agency } = require("../models");
// const { departments } = require("../departments");

const typeDefs = gql`
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
  Mutation: {
    addAgencies: async () => {
      try {
        return departments.map(async (v) => {
          return await Agency.create(v);
        });
        // let response = await Agency.create(Agencies);
        // console.log(Agencies);
        // return response;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
