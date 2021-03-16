const { gql } = require("apollo-server");
const { matches } = require("lodash");
const { Agency, User } = require("../models");

const typeDefs = gql`
  type Query {
    agencies: [Agency]
    agencies_by_city(city: String, county: String, state: String): [Agency]
    agencies_by_state(state: String): [Agency]
    users: [User]
    favorites(userId: String!): [Favorite]
  }
`;

const resolvers = {
  Query: {
    favorites: async (_, user) => {
      let currentUser = await User.find({ userId: user.email });
      return currentUser[0].favorites;
    },
    users: async () => await User.find({}).exec(),
    agencies: async () => await Agency.find({}).exec(),
    agencies_by_city: async (obj, { city, county, state }) => {
      let countyRegex = new RegExp(county, "g");
      const matchesCity = await Agency.find({
        city: city,
        state: state,
      }).exec();
      const countyAgency = await Agency.find({ agency: countyRegex }).exec();
      if (countyAgency[0].city === city) {
        return matchesCity;
      }
      return matchesCity.concat(countyAgency);
    },
    agencies_by_state: async (obj, { state }) => {
      const byState = await Agency.find({ state: state }).exec();
      return byState;
    },
  },
};

module.exports = { typeDefs, resolvers };
