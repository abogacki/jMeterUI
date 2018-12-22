import React, { Component } from 'react';
import './App.scss';
import Routes from './router/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/store'

import Footer from './components/rootComponents/Footer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <React.Fragment>
              <Routes />
              <Footer />
            </React.Fragment>
          </Router>
        </Provider>
      </div>
    );
  }
}



export default App;
