import React from 'react';
import { Provider } from 'react-redux'
import store from '../redux/userRedux/store'
import './App.css';
import CreateAccount from '../pages/CreateAccount'
import Login from '../pages/Login'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Login />
      <CreateAccount /><br/><br/><br/>
    </div>
    </Provider>
  );
}

export default App;
