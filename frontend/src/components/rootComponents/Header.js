import React from 'react';
import {
    Container,
    NavbarBurger,
    NavbarMenu,
    NavbarEnd,
    Navbar,
    NavbarBrand,
    NavbarItem,
    HeroHeader,
    Tabs
} from 'bloomer';

import { NavLink } from 'react-router-dom'
import { withConfig } from '../../hoc/withConfig'

const Header = ({appName, ...props}) => (
    <HeroHeader>
        <Navbar>
            <Container>
                <NavbarBrand>
                    <NavbarItem className="brand-text has-text-weight-light" href="/">
                        {appName}
                    </NavbarItem>
                    <NavbarBurger>
                        <span></span>
                        <span></span>
                        <span></span>
                    </NavbarBurger>
                </NavbarBrand>
                <NavbarMenu id="navMenu" className="navbar-menu">
                    <NavbarEnd>
                        <Tabs className="is-right">
                            <li>
                                <NavLink activeClassName="is-active" to="/">Home</NavLink>
                            </li>

                            <li>
                                <NavLink activeClassName="is-active" to="/tests">Tests</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="is-active" to="/stats">Stats</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="is-active" to="html">Exceptions</NavLink>
                            </li>
                        </Tabs>
                    </NavbarEnd>
                </NavbarMenu>
            </Container>
        </Navbar>
    </HeroHeader>
)

export default withConfig(Header)