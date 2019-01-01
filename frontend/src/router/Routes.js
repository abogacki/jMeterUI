import React from 'react';
import { Route } from "react-router-dom";
import posed from 'react-pose';
import Index from '../views/Index'
import Tests from '../views/Tests'
import About from '../views/About'
import StatsIndex from '../views/stats/Stats'
import { IndexBackground } from "../svg/IndexBackground";
import Header from '../components/rootComponents/Header'
import { HeroBody, Title, Hero, } from 'bloomer';
import { withRouter, Redirect } from "react-router-dom";

const PosedDiv = posed.div({
    enter: {
        opacity: 1,
        x: 1
    },
    exit: {
        opacity: 0,
        x: -10
    }
})

const Container = posed.div({
    enter: {
        opacity: 1,
        delayChildren: 50,
        staggerChildren: 200,
    },
    exit: {
        // opacity:0,
    }
})

const Div = ({ children, ...props }) => (
    <PosedDiv initialPose="exit" pose="enter" {...props} >
        {children}
    </PosedDiv>
)

const HeroBodyWrapper = ({ component, ...props }) => (
    <Hero
        // isColor="info" 
        isSize="medium"
        className="is-info is-bold ">
        <IndexBackground />
        <Header />
        <HeroBody {...props}>{component}</HeroBody>
    </Hero>)

const HeroNavbarWrapper = ({ component, title }) => (
    <Container pose="enter" initialPose="exit">
        <Hero isColor="info" isSize="medium" className="is-bold">
            <Header />
        </Hero>
        <Hero className="is-info is-bold">
            <HeroBody>
                <Div className="container">
                    <Title>{title}</Title>
                </Div>
            </HeroBody>
        </Hero>
        <Hero>
            <Div className="section">
                {component}
            </Div>
        </Hero>
    </Container>
)

const WrappedIndex = props => <HeroBodyWrapper component={<Index />} />
const WrappedTests = props => <HeroNavbarWrapper title={'Tests'} component={<Tests />} />
const WrappedStats = props => <HeroNavbarWrapper title={'Stats'} component={<StatsIndex />} />
const WrappedAbout = props => <HeroNavbarWrapper title={'About'} component={<About />} />

const Routes = ({ match }) => {
    const { testId } = match.params;
    console.log(match);

    return (
        <React.Fragment>
            <Route path="/" exact component={WrappedIndex} />
            <Route path="/tests" component={WrappedTests} />
            {/* <Route path="/stats" exact component={WrappedStats} /> */}
            <Route exact path="/stats" render={() => <Redirect to="/tests" />} />
            <Route path="/stats/:testId" component={WrappedStats} />
            <Route path="/about" component={WrappedAbout} />
        </React.Fragment>
    )
}


export default withRouter(Routes)