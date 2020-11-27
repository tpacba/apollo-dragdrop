import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Container } from 'semantic-ui-react';

import { AuthProvider } from './utils/Auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar></MenuBar>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
