import React from "react";
import LoaderInput from "../LoaderInput";
import { HeroBody } from "bloomer/lib/layout/Hero/HeroBody";
import { Container } from "bloomer/lib/layout/Container";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { Title } from "bloomer/lib/elements/Title";

const Home = () => (
  <HeroBody className="is-fullheight is-bold">
    <Container className=" has-text-centered">
      <Title>
        <span>Welcome to </span>
        <span
          className="has-text-weight-light"
          style={{ borderBottom: "2px solid whitesmoke" }}
        >
          jMeterUI
        </span>
      </Title>
      <Subtitle>
        Upload your <code>.csv</code> file right away <br />
        <br />
        <LoaderInput />
        <a className="button is-rounded is-primary" href="/#/tests/create">
          {" "}
          Create benchmark{" "}
        </a>
      </Subtitle>
    </Container>
  </HeroBody>
);

export default Home;
