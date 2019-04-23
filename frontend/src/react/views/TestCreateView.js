import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { create as createBenchmark } from '../../redux/benchmarks/index';
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

const TestCreateView = () => <TestForm/>

const mapDispatchToProps = dispatch => ({
  createBenchmark: (data, history) => dispatch(createBenchmark(data, history))
})

export default connect(null, mapDispatchToProps)(TestCreateView)