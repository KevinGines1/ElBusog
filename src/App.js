import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './ElbusogCSS/ElbusogCSS.css';
import FetchData from './components/FetchData';
import Nav from './components/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <FetchData />
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
