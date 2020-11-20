const resolvers = {
    Query: {
        async sayHello() {
            try {
                return "Hello world!"
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}