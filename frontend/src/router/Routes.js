import React from 'react';
import { Route } from "react-router-dom";
import Home from '../react/views/Home'
import Tests from '../react/views/testsList/Tests'
import About from '../react/views/About'
import StatsIndex from '../react/views/stats/Stats'
import CreateTest from '../react/views/TestCreateView'
import { withRouter } from "react-router-dom";
import HeroNavbarWrapper from './HeroNavbarWrapper'

const WrappedHome = () => <HeroNavbarWrapper component={<Home />} />
const WrappedTests = () => <HeroNavbarWrapper title={'Tests'} component={<Tests />} />
const WrappedStats = () => <HeroNavbarWrapper title={'Stats'} component={<StatsIndex />} />
const WrappedAbout = () => <HeroNavbarWrapper title={'About'} component={<About />} />
const WrappedCreateTest = () => <HeroNavbarWrapper title={'Create test'} component={<CreateTest />} />

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={WrappedHome} />
      <Route exact path="/tests/create" component={WrappedCreateTest} />
      <Route exact path="/tests" component={WrappedTests} />
      <Route path="/stats/:testId" component={WrappedStats} />
      <Route path="/about" component={WrappedAbout} />
    </>
  )
}


export default withRouter(Routes)