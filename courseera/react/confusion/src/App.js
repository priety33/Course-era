import React, { Component } from 'react';
import Main from './components/MainComponent'
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      //surround my React application with this provider => 
      //when I do this, my Store, React Store becomes available to all the components within my React application.
      <Provider store= {store}>
      <BrowserRouter>
          <div className="App">
          <Main />
          </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
