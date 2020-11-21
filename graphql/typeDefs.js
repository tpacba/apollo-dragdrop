const { gql } = require('apollo-server');

const typeDefs = gql`
    type File {
        id: ID!
        filename: String!
        mimetype: String!
        path: String!
    }
    type Query {
        sayHello: String!
        readFiles: [File!]
    }
    type Mutation {
        uploadFile(file: Upload!): File
    }
`;

module.exports = typeDefs;