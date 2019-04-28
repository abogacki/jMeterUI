import React from 'react'
import { connect } from 'react-redux';
import { create as createBenchmark, createFromForm } from '../../redux/benchmarks/benchmarks';
import TestForm from '../testForm/TestForm'

const TestCreateView = ({startBenchmark}) => <TestForm onSubmit={startBenchmark}/>

const mapDispatchToProps = dispatch => ({
  startBenchmark: formValues => dispatch(createFromForm(formValues)),
  createBenchmark: (data, history) => dispatch(createBenchmark(data, history))
})

export default connect(null, mapDispatchToProps)(TestCreateView)