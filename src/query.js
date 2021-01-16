const { gql } = require("apollo-server");
const { Agency } = require("../models");

const typeDefs = gql`
  type Query {
    agencies: [Agency]
    agencies_by_city(city: String, county: String): [Agency]
  }
`;

const resolvers = {
  Query: {
    agencies: async () => await Agency.find({}).exec(),
    agencies_by_city: async (obj, { city, county }) => {
      const matchingAgencies = await Agency.find({}).exec();
      return matchingAgencies.filter(
        (v) =>
          city === v.city ||
          (v.agency.includes(county) && !v.agency.includes("("))
      );
    },
  },
};

module.exports = { typeDefs, resolvers };
