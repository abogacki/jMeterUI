import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { create as createBenchmark } from '../../redux/actions/benchmarkDataActions';
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

  handleGroupAdd(e) {
    this.setState(prevState => prevState.requestGroups.push({ url: '', method: '', count: '' }))
  }

  async handleSubmit(e) {
    this.setState(prevState => ({ ...prevState, isLoading: true }))

    const onSuccess = (response) => {
      this.setState(prevState => ({ ...prevState, isLoading: false }))
      const converted = response.map(r => convertTypes(r));

      this.props.createBenchmark({ name: this.state.name, data: converted })

    }

    try {
      const { requestGroups, baseURL } = this.state;

      const requests = [];

      requestGroups.forEach(({ count, ...rg }) => range(count).forEach(r => requests.push(rg)));

      const results = await Promise.all(requests.map(({ name, ...rest }) => axios({ baseURL, ...rest })))

      onSuccess(results)
    } catch (error) {
      this.setState(prevState => ({ ...prevState, isLoading: false }))
      alert(error)
    }
  }

  handleChange(e) {
    e.persist()
    this.setState(prevState =>
      ({
        ...prevState,
        [e.target.name]: e.target.value
      })
    )
  }
  handleGroupChange(e, index) {
    e.persist()
    console.log(e.target.name, index);
    let requestGroups = [...this.state.requestGroups]
    requestGroups[index] = {
      ...requestGroups[index],
      [e.target.name]: e.target.value
    };

    this.setState(prevState => ({
      ...prevState,
      requestGroups
    }), () => console.log(this.state))
  }
  render() {
    return (
      <React.Fragment>
        <TestForm
          onChange={this.handleChange.bind(this)}
          addGroup={this.handleGroupAdd.bind(this)}
          onGroupChange={this.handleGroupChange.bind(this)}
          submit={this.handleSubmit.bind(this)}
          {...this.state}
        />
      </React.Fragment>
    )
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
    timeStamp: new Date(config.metadata.endTime).getTime() * 1000,
  })
}

const mapDispatchToProps = dispatch => ({
  createBenchmark: (data, history) => dispatch(createBenchmark(data, history))
})

export default connect(null, mapDispatchToProps)(NewTestClassComponent)