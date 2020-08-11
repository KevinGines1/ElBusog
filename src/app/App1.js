import React from 'react';
import { Provider } from 'react-redux'
import store from '../redux/store'
import './App.css';

import UserContainer from '../components/UserContainer'
import CreateAccount from '../pages/CreateAccount'
import Login from '../pages/Login'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
   	  <UserContainer/>
      <Login />
      <CreateAccount /><br/><br/><br/>
    </div>
    </Provider>
  );
}

export default App;
