import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { AuthProvider } from './utils/Auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
