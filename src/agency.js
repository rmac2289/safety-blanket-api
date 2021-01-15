const { gql } = require("apollo-server");

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
`;

module.exports = { typeDefs };
