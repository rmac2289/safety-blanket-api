const { ApolloServer, gql } = require('apollo-server');
const { departments } = require('./data');

const typeDefs = gql`

    type Department {
        agency: String
        phone: String
        street: String
        city: String
        state: String
        zip: Int
    }

    type Query {
        agencies: [Department] 
        agencies_by_state(state: String): [Department]
    }

`;

const resolvers = {
    Query: {
        agencies: () => {
            return departments;
        },
        agencies_by_state: (obj, { state }, context, info) => {
            const foundStates = departments.filter(v => v.state === state)
            return foundStates
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`)
});



