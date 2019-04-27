import axios from 'axios'
import { csvToJs } from '../../helpers/csvTojs'
import groupData from './groupData'
import calcStats from './calcStats'

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

const LIST_BENCHMARKS_BEGIN = 'jmeterui/benchmarks/LOAD_LIST_BEGIN'
const LIST_BENCHMARKS_SUCCESS = 'jmeterui/benchmarks/LIST_BENCHMARKS_SUCCESS'
const LIST_BENCHMARKS_ERROR = 'jmeterui/benchmarks/LIST_BENCHMARKS_ERROR'
const LOAD_TESTDETAILS_BEGIN = 'jmeterui/benchmarks/LOAD_TESTDETAILS_BEGIN'
const UPDATE_DETAILS = 'jmeterui/benchmarks/UPDATE_DETAILS'
const START_BENCHMARK = 'jmeterui/benchmarks/START_BENCHMARK'
const END_BENCHMARK = 'jmeterui/benchmarks/END_BENCHMARK'

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
    case LIST_BENCHMARKS_SUCCESS:
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
  await performTest(formData);

}

// perform batches of tests
const performTest = async ({ name, baseURL, requestGroups }) => {
  let requests = []
  requestGroups.forEach(({ count, ...group }) => range(count).forEach(() => requests.push(group)))
  console.log(requests);
  const results = await Promise.all(requests.map(({ url, method }) => axios({ baseURL, url, method: 'get', headers: { 'Access-Control-Allow-Origin': '*' } })))
  console.log(results);

}

const range = (index = 100) => {
  let arr = []
  for (let i = 0; i < index; i++) {
    arr[i] = i;
  }
  return arr
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
  dispatch({ type: LIST_BENCHMARKS_BEGIN })

  const onSuccess = response => {
    dispatch({ type: LIST_BENCHMARKS_SUCCESS, payload: response.data })
  }

  const onError = error => {
    dispatch({ type: LIST_BENCHMARKS_ERROR, payload: error })
  }

  try {
    const url = '/test/list'
    const baseURL = 'http://localhost:8080/api'
    const tests = await axios({ method: 'get', baseURL, url })
    onSuccess(tests);
  } catch (error) {
    onError(error);
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