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
  input DeleteFavorite {
    agency: String!
    state: String!
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
    deleteFavorite(userId: String!, favorite: DeleteFavorite): User
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
    deleteFavorite: async (_, user) => {
      try {
        let currentUser = await User.findOne({ userId: user.userId });
        let currentFavs = currentUser.favorites;
        let idxToDelete;
        for (let i = 0; i < currentFavs.length; i++) {
          if (
            currentFavs[i].agency === user.favorite.agency &&
            currentFavs[i].state === user.favorite.state
          ) {
            idxToDelete = i;
            break;
          }
        }
        let last = currentFavs.length - 1;
        [currentFavs[idxToDelete], currentFavs[last]] = [
          currentFavs[last],
          currentFavs[idxToDelete],
        ];
        currentFavs.pop();
        console.log(`Successfully deleted.`);
        return User.updateOne(
          { userId: currentUser.userId },
          { favorites: currentFavs }
        );
      } catch (e) {
        return e.message;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
