const { gql } = require("apollo-server");

const typeDefs = gql`
  type Favorite {
    id: ID
    agency: String
    phone: String
    street: String
    city: String
    state: String
    zip: Int
  }
  type User {
    id: ID
    userId: String
    favorites: [Favorite]
  }
`;

module.exports = { typeDefs };
