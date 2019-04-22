import React, { Component } from 'react';
import Routes from './router/Routes'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Footer from './react/Footer'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
        <Footer />
      </Provider>
    );
  }
}



export default App;
