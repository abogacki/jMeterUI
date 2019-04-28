import axios from 'axios'
import { csvToJs } from '../../helpers/csvTojs'
import groupData from './groupData'
import calcStats from './calcStats'
import {addAndRemoveToast} from '../toasts/index'

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

const LIST_BENCHMARKS = 'jmeterui/benchmarks/LIST_BENCHMARKS'
const LOAD_TESTDETAILS_BEGIN = 'jmeterui/benchmarks/LOAD_TESTDETAILS_BEGIN'
const UPDATE_DETAILS = 'jmeterui/benchmarks/UPDATE_DETAILS'

// make nested reducers for data called "details", and for list
const initialState = {
  test: {
    list: [],
    data: {
      testData: []
    },
    groupedData: {},
    groupedStats: [],
    isLoading: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_BENCHMARKS:
      return { ...state, test: { ...state.test, list: action.payload.test } }
    case LOAD_TESTDETAILS_BEGIN:
      return { ...state, test: { ...state.test, isLoading: true }, }
    case UPDATE_DETAILS:
      const groupedData = groupData(action.payload.testData);
      const groupedStats = calcStats(groupedData);
      return { ...state, test: { data: action.payload, groupedData, groupedStats, isLoading: false } }
    default:
      return state
  }
}

export const createFromFile = ({ data, name }) => async dispatch => {
  const benchmarkDataObject = csvToJs(data);
  dispatch(create({ name, data: benchmarkDataObject }))
}

export const createFromForm = (formData) => async dispatch => {
  window.location.href = '/#/'
  // here send form data to backend, than retrive created benchmark data
  dispatch(addAndRemoveToast({message: () => 'This functions is not implemented yet', isColor: 'danger'}))
}

export const create = ({ data, name }) => async () => {
  const newData = new FormData()
  newData.append('name', name)
  newData.append('testData', JSON.stringify(data))

  try {

    const url = '/test/create';
    const baseURL = 'http://localhost:8080/api';

    const response = await axios({
      method: 'POST',
      data: newData,
      baseURL,
      url
    });

    const testId = response.data.post._id;

    // navigate to new request
    window.location.href = '/#/stats/' + testId;

  } catch (error) {
    console.error(error);
  }
}

export const list = () => async dispatch => {

  const onSuccess = response => {
    dispatch({ type: LIST_BENCHMARKS, payload: response.data })
  }

  try {
    const url = '/test/list'
    const baseURL = 'http://localhost:8080/api'
    const tests = await axios({ method: 'get', baseURL, url })
    onSuccess(tests);
  } catch (error) {
    console.error(error);
  }
}

export const updateDetails = (data) => ({ type: UPDATE_DETAILS, payload: data })

export const getDetails = testId => async dispatch => {
  const onSuccess = response => dispatch(updateDetails(response.data))

  try {
    dispatch({ type: LOAD_TESTDETAILS_BEGIN })
    const url = `/test/${testId}`
    const baseURL = 'http://localhost:8080/api'
    const testDetails = await axios({ method: 'get', baseURL, url });
    onSuccess(testDetails);
  } catch (error) {
    console.error(error);
  }
}