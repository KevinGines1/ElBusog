import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/randomizer/store.js';
import Nav from '../components/Nav';
import StickyNavbar from '../components/StickyNavbar';
import Footer from '../components/Footer';
// import FetchData from '../components/FetchData';

// import Home from '../pages/Home';
import Profile from '../pages/Profile';
import About from '../pages/About';

import './App.css';

const App = () => (
  <Provider store={store}>
    {/* <FetchData /> */}
    <Router>
      <div className="App">
        <Nav/>
        <StickyNavbar/>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/about" component={About} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  </Provider>
);

export default App;
