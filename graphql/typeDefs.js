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
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        sayHello: String!
        readFiles: [File!]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        uploadFile(file: Upload!, post: String!): File
    }
`;

module.exports = typeDefs;