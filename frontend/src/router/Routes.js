import React from "react";
import { Route } from "react-router-dom";
import Home from "../react/views/Home";
import Tests from "../react/views/testsList/TestsList";
import About from "../react/views/About";
import Details from "../react/views/details/Details";
import CreateTest from "../react/views/TestCreateView";
import HeroNavbarWrapper from "./HeroNavbarWrapper";

const WrappedHome = () => <HeroNavbarWrapper component={Home} />;
const WrappedTests = () => (
  <HeroNavbarWrapper title={"Tests"} component={Tests} />
);
const WrappedDetails = () => (
  <HeroNavbarWrapper title={"Details"} component={Details} />
);
const WrappedAbout = () => (
  <HeroNavbarWrapper title={"About"} component={About} />
);
const WrappedCreateTest = () => (
  <HeroNavbarWrapper title={"Create test"} component={CreateTest} />
);

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={WrappedHome} />
      <Route exact path="/tests/create" component={WrappedCreateTest} />
      <Route exact path="/tests" component={WrappedTests} />
      <Route path="/details/:testId" component={WrappedDetails} />
      <Route path="/about" component={WrappedAbout} />
    </>
  );
};

export default Routes;
