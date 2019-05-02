import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("../react/views/Home"));
const Tests = lazy(() => import("../react/views/testsList/TestsList"));
const About = lazy(() => import("../react/views/About"));
const Details = lazy(() => import("../react/views/details/Details"));
const CreateTest = lazy(() => import("../react/views/TestCreateView"));
const HeroNavbarWrapper = lazy(() => import("./HeroNavbarWrapper"));

const WrappedHome = () => <HeroNavbarWrapper component={Home} />;

const WrappedTests = () => (
  <HeroNavbarWrapper title="Tests" component={Tests} />
);

const WrappedDetails = () => (
  <HeroNavbarWrapper title="Details" component={Details} />
);

const WrappedAbout = () => (
  <HeroNavbarWrapper title="About" component={About} />
);

const WrappedCreateTest = () => (
  <HeroNavbarWrapper title="Create test" component={CreateTest} />
);

const Loader = () => <div className="Loader" />;

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Route exact path="/" component={WrappedHome} />
      <Route exact path="/tests/create" component={WrappedCreateTest} />
      <Route exact path="/tests" component={WrappedTests} />
      <Route path="/details/:testId" component={WrappedDetails} />
      <Route path="/about" component={WrappedAbout} />
    </Suspense>
  );
};

export default Routes;
