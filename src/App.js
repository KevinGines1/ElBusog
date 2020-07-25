import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './ElbusogCSS/ElbusogCSS.css';
import Nav from './components/nav';
import Home from './components/home';
import Profile from './components/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
