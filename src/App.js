import React, { Component } from 'react';
import './App.scss';
import {
  Container,
  NavbarBurger,
  NavbarMenu,
  NavbarStart,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Hero,
  HeroBody
} from 'bloomer';
import Routes from './router/Routes'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div>
              <Header />
              <Container>
                <Hero isFullHeight>
                  <HeroBody>
                    <Routes />
                  </HeroBody>
                </Hero>
              </Container>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}



const Header = props => (
  <Navbar>
    <Container>
      <NavbarBrand>
        <NavbarItem className="brand-text" href="../">
          Bulma Admin
        </NavbarItem>
        <NavbarBurger data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </NavbarBurger>
      </NavbarBrand>
      <NavbarMenu id="navMenu" className="navbar-menu">
        <NavbarStart>
          <NavLink className="navbar-item" activeClassName="is-active" to="/">
            Home
          </NavLink>
          <NavLink className="navbar-item" activeClassName="is-active" to="/about">
            About
          </NavLink>
          <NavLink className="navbar-item" activeClassName="is-active" to="/stats">
            Stats
          </NavLink>
          <NavLink className="navbar-item" activeClassName="is-active" to="html">
            Exceptions
          </NavLink>
        </NavbarStart>
      </NavbarMenu>
    </Container>
  </Navbar>
)

export default App;
