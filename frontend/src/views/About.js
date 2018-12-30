import React from 'react';

const About = props => (
    <div class="container">
        <div className="tab-pane is-active" id="pane-2">
            <div className="content">
                <h1>Hello World, this is <u className="has-text-weight-light">jMeterUI</u> !</h1>
                <p>
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

                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Sub<sub>script</sub> works as well!</p>
                </div>
        </div>
    </div>

)

export default About
