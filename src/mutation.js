const { gql } = require("apollo-server");
const { Agency, User } = require("../models");
const { departments } = require("../sheriffs");

const typeDefs = gql`
  input FavoriteInput {
    agency: String!
    phone: String!
    street: String!
    city: String!
    state: String!
    zip: Int!
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
    addUser(userId: String!): User
    addFavorite(userId: String!, favorites: FavoriteInput): User
  }
`;

const resolvers = {
  Mutation: {
    addAgencies: async () => {
      try {
        return departments.map(async (v) => {
          return await Agency.create(v);
        });
      } catch (error) {
        return error.message;
      }
    },
    addUser: async (_, user) => {
      return await User.create(user);
    },
    addFavorite: async (_, user) => {
      try {
        let currentUser = await User.findOne({ userId: user.userId });
        for (let dept of currentUser.favorites) {
          if (
            dept.agency === user.favorites.agency &&
            dept.state === user.favorites.state
          ) {
            return "Agency already in favorites.";
          }
        }
        let newFavs = [...currentUser.favorites, user.favorites];
        return await User.updateOne(
          { userId: currentUser.userId },
          { favorites: newFavs }
        );
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
