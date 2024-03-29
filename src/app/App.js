
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store.js';
import './App.css';



//components
import Nav from '../components/Nav';
import StickyNavbar from '../components/StickyNavbar';
import Footer from '../components/Footer';
import FetchData from '../components/FetchData.js';
import ScrollToTop from '../components/ScrollToTop';
import PrivateRoute from '../components/PrivateRoute';

//pages
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import FoodPlaceMain from '../pages/FoodPlaceMain';
import FoodPlace from '../pages/FoodPlace';
import About from '../pages/About';
import CreateAccount from '../pages/CreateAccount'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound';

const App = () => (
  <Provider store={store}>
    <FetchData />
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Nav/>
        <StickyNavbar/>
        <Switch>
          <PrivateRoute path="/login" exact component={Login} />
          <PrivateRoute path="/register" exact component={CreateAccount}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/" exact component={Home}/>
          <Route path="/foodplace" exact component={FoodPlaceMain}/>
          <Route path="/foodplace/:foodPlaceName" component={FoodPlace}/>
          <Route path="/about" component={About} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  </Provider>
);

export default App;
