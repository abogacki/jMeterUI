import React from 'react';
import Routes from './router/Routes'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Footer from './react/Footer'
import Toasts from './react/Toasts'


const App = () => (
  <Provider store={store}>
    <Toasts />
    <Router>
      <Routes />
    </Router>
    <Footer />
  </Provider>
);


export default App;
