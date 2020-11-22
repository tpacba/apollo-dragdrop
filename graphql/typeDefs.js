const { gql } = require('apollo-server');

const typeDefs = gql`
    type File {
        id: ID!
        filename: String!
        mimetype: String!
        path: String!
        post: String!
        createdAt: String!
    }
    type Query {
        sayHello: String!
        readFiles: [File!]
    }
    type Mutation {
        uploadFile(file: Upload!, post: String!): File
    }
`;

module.exports = typeDefs;