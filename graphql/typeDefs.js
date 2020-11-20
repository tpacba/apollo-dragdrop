const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        sayHello: String!
    }
`;

module.exports = typeDefs;