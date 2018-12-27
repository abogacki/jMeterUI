import React from 'react';
import LoaderInput from '../components/loadInput';
// import makeInstance from "axios";
import makeInstance from 'axios'

const axios = makeInstance.create({ baseURL: 'http://localhost:8080/' })

const checkApi = () => axios({method: 'get', url: '/'}).then(response => console.log(response))

checkApi();

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
                </h2>
            </div>
        </div>
    </React.Fragment>
)

export default Index