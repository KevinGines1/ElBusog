import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import Nav from '../components/Nav';

//zeit's nav
// import Nav1 from '../components/Nav1' 


import StickyNavbar from '../components/StickyNavbar';
import Footer from '../components/Footer';
import About from '../pages/About';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import './App.css';
import FetchData from '../components/FetchData.js';

const App = () => (
  <Provider store={store}>
    <FetchData />
    <Router>
      <div className="App">
        <Nav/>
        {/* <Nav1 /> */}
        <StickyNavbar/>
        <Switch>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  </Provider>
);

export default App;
