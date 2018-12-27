import React from 'react';
import { Route } from "react-router-dom";
import Index from '../views/Index'
import Tests from '../views/Tests'
import Stats from '../views/stats/Stats'

import Header from '../components/rootComponents/Header'
import { HeroBody, Container, Title, Hero, Section } from 'bloomer';

const HeroBodyWrapper = ({ component, ...props }) => (
<Hero isColor="info" isSize="medium" className="is-bold">
    <Header />
    <HeroBody {...props}>{component}</HeroBody>
</Hero>)

const HeroNavbarWrapper = ({ component, title }) => (
    <React.Fragment>
        <Hero isColor="info" isSize="medium" className="is-bold">
            <Header />
        </Hero>
        <Hero className="is-info is-bold">
            <HeroBody>
                <Container>
                    <Title>{title}</Title>
                </Container>
            </HeroBody>
        </Hero>
        <Hero>
        <Section>
        {component}
        </Section>
        </Hero>
    </React.Fragment>
)

const WrappedIndex = props => <HeroBodyWrapper component={<Index />} />
const WrappedTests = props => <HeroNavbarWrapper title={'Tests'} component={<Tests />} />
const WrappedStats = props => <HeroNavbarWrapper title={'Stats'} component={<Stats.Index />} />

export default props => {
    return (
        <React.Fragment>
            <Route path="/" exact component={WrappedIndex} />
            <Route path="/tests" component={WrappedTests} />
            <Route path="/stats" component={WrappedStats} />
        </React.Fragment>
    )
}