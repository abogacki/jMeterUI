import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { create as createBenchmark } from '../../redux/ducks/benchmarks';
import TestForm from '../TestForm'

axios.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  response.config.metadata.endTime = new Date()
  response.elapsed = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
}, (error) => {
  error.config.metadata.endTime = new Date();
  error.elapsed = 0;
  return Promise.reject(error);
});


class NewTestClassComponent extends React.Component {
  render() {
    return <TestForm />
  }
}

const range = (len = 100) => {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr[i] = i;
  }
  return arr
}

const convertTypes = ({ elapsed, request, config }) => {
  return ({
    IdleTime: Math.floor(Math.random() / 100) * 100,
    Latency: Math.floor(Math.random() / 100) * 100,
    allThreads: Math.floor(Math.random() / 100) * 100,
    bytes: Math.floor(Math.random() / 100) * 100,
    dataType: " ",
    elapsed,
    failureMessage: '',
    label: request.responseURL.toString(),
    responseCode: Math.floor(Math.random() / 100) * 100,
    responseMessage: '',
    sentBytes: Math.floor(Math.random() / 100) * 100,
    success: true,
    threadName: request.responseURL,
    timeStamp: new Date(config.metadata.startTime).getTime() * 1000,
  })
}

const mapDispatchToProps = dispatch => ({
  createBenchmark: (data, history) => dispatch(createBenchmark(data, history))
})

export default connect(null, mapDispatchToProps)(NewTestClassComponent)