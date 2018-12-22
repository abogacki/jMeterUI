import React from 'react';
import { Route } from "react-router-dom";
import Index from '../views/Index'
import About from '../views/About'
import Stats from '../views/stats/Stats'

import Header from '../components/rootComponents/Header'
import { HeroBody, Container } from 'bloomer';
import { Hero } from 'bloomer';



const HeroBodyWrapper = ({ component, ...props }) => <Hero isColor="info" isSize="medium" className="is-bold">
    <Header />
    <HeroBody {...props}>{component}</HeroBody>
</Hero>

const HeroNavbarWrapper = ({ component, ...props }) => (
    <React.Fragment>
        <Hero isColor="info" isSize="medium" className="is-bold">
            <Header />
        </Hero>
        <Container {...props}>{component}</Container>
    </React.Fragment>
)

const WrappedIndex = props => <HeroBodyWrapper component={<Index />} />
const WrappedAbout = props => <HeroNavbarWrapper component={<About />} />
const WrappedStats = props => <HeroNavbarWrapper component={<Stats.Index />} />

export default props => {
    return (
        <React.Fragment>
            <Route path="/" exact component={WrappedIndex} />
            <Route path="/about/" component={WrappedAbout} />
            <Route path="/stats/" component={WrappedStats} />
        </React.Fragment>
    )
}