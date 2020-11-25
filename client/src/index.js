import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const httpLink = createUploadLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: httpLink,
  cache: InMemoryCache
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();