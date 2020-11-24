const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const mongoose = require('mongoose');
const { MONGO_CONNECTION } = require('./config');

const PORT = process.env.port || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected 🚀 To MongoDB Successfully");
        return server.listen({ port: PORT })
    })
    .then(res => {
        console.log(`🚀 server running @ ${res.url}`)
    })
    .catch(err => {
        console.log(err)
    })