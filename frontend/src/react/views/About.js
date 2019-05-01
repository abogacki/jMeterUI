import React from "react";
import { Container } from "bloomer/lib/layout/Container";
import { Content } from "bloomer/lib/elements/Content";

const About = props => (
  <Container>
    <Content>
      <h1>
        Hello World, this is <u className="has-text-weight-light">jMeterUI</u> !
      </h1>
      <article>
        This application is an interface for Apache jMeter results saved in CSV,
        created by <strong>Andrzej Bogacki</strong>.
        <br />
        Technologies used:
        <ul>
          <li>docker</li>
          <li>node.js</li>
          <li>keystoneJS</li>
          <li>react</li>
          <li>redux</li>
          <li>mongoDB</li>
        </ul>
      </article>
    </Content>
  </Container>
);

export default About;
