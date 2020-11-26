import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
  uri: "http://localhost:4000"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  
  return {
    headers: {
      Authorizaiton: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);