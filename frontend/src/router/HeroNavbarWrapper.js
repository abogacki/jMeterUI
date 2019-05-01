import React from "react";
import posed from "react-pose";
import Header from "../react/Header";
import { Hero } from "bloomer/lib/layout/Hero/Hero";
import { HeroBody } from "bloomer/lib/layout/Hero/HeroBody";
import { Title } from "bloomer/lib/elements/Title";

const PosedDiv = posed.div({
  enter: {
    opacity: 1,
    x: 1
  },
  exit: {
    opacity: 0,
    x: -10
  }
});

const Container = posed.div({
  enter: {
    opacity: 1,
    delayChildren: 50,
    staggerChildren: 200
  }
});

const Div = ({ children, ...props }) => (
  <PosedDiv initialPose="exit" pose="enter" {...props}>
    {children}
  </PosedDiv>
);

const HeroNavbarWrapper = ({ component: Component, title }) => (
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
        <Component />
      </Div>
    </Hero>
  </Container>
);

export default HeroNavbarWrapper;
