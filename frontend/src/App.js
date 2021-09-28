import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Inbox from './pages/Inbox';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/inbox' component={Inbox} />
      </Switch>
    </Router>
  );
};

export default App;
