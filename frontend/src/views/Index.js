import React from 'react';
import LoaderInput from '../components/loadInput';

const Index = props => (
    <React.Fragment>
        <div className="hero-body is-fullheight">
            <div className="container has-text-centered">
                <h1 className="title">
                    Welcome to&nbsp;
                    <span className="has-text-weight-light" style={{ borderBottom: '2px solid whitesmoke' }}>jMeterUI</span>
                </h1>
                <h2 className="subtitle">
                    Upload your <code>.csv</code> file right away
                    <br />
                    <br />
                    <LoaderInput />
                    <a className="button is-rounded is-primary" href="/#/new"> Create test </a> 
                </h2>
            </div>
        </div>
    </React.Fragment>
)

export default Index