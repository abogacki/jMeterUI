import React from 'react';

const About = props => (
  <div className="container">
    <div className="tab-pane is-active" id="pane-2">
      <div className="content">
        <h1>Hello World, this is <u className="has-text-weight-light">jMeterUI</u> !</h1>
        <article>
          This application is an interface for Apache jMeter results saved in CSV, created by <strong>Andrzej Bogacki</strong>.
                    <br />Technologies used:
                    <ul>
            <li>docker</li>
            <li>node.js</li>
            <li>keystoneJS</li>
            <li>react</li>
            <li>redux</li>
            <li>mongoDB</li>
          </ul>
        </article>
      </div>
    </div>
  </div>

)

export default About
