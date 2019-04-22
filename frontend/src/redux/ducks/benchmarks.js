import axios from 'axios'
import statsLite from 'stats-lite';
import { csvToJs } from '../../helpers/csvTojs'

const LIST_TESTS_BEGIN = "LIST_TESTS_BEGIN"
const LIST_TESTS_SUCCESS = "LIST_TESTS_SUCCESS"
const LIST_TESTS_ERROR = "LIST_TESTS_ERROR"
const LOAD_BENCHMARK = 'LOAD_BENCHMARK';
const LOAD_TESTDETAILS_BEGIN = "LOAD_TESTDETAILS_BEGIN"
const LOAD_TESTDETAILS_SUCCESS = "LOAD_TESTDETAILS_SUCCESS"
const LOAD_TESTDETAILS_ERROR = "LOAD_TESTDETAILS_ERROR"


const testInitialState = {
  list: [],
  data: {
    testData: []
  },
  groupedData: {},
  groupedStats: [],
  isLoading: false
}

const initialState = {
  test: testInitialState,
  benchmark: undefined
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BENCHMARK:
      return { ...state, benchmark: { ...action.payload } };
    case LIST_TESTS_SUCCESS:
      return { ...state, test: { ...state.test, list: action.payload.test } }
    case LOAD_TESTDETAILS_BEGIN:
      return { ...state, test: { ...state.test, isLoading: true }, }
    case LOAD_TESTDETAILS_SUCCESS:
      const groupedData = groupData(action.payload.testData);
      const groupedStats = calcStats(groupedData);
      return { ...state, test: { data: action.payload, groupedData, groupedStats, isLoading: false } }
    default:
      return state
  }
}




const convertjMeterStringsToJsTypes = object => {
  return ({
    IdleTime: Number(object.IdleTime),
    Latency: Number(object.Latency),
    allThreads: Number(object.allThreads),
    bytes: Number(object.bytes),
    dataType: object.dataType.toString() + " ",
    elapsed: Number(object.elapsed),
    failureMessage: object.failureMessage.toString() + " ",
    label: object.label.toString() + " ",
    responseCode: Number(object.responseCode),
    responseMessage: object.responseMessage.toString() + " ",
    sentBytes: Number(object.sentBytes),
    success: (object.success === "true"),
    threadName: object.threadName.toString() + " ",
    timeStamp: object.timeStamp.toString() + " ",
  })
}

const groupData = testData => {
  const labelTypes = [];
  let groupedData = {};

  testData.forEach(row => {
    const fixedLabel = row.label.replace(/-.*/, '').trim();
    if (!labelTypes.includes(fixedLabel)) {
      labelTypes.push(fixedLabel)
      groupedData[fixedLabel] = [];
    }
    groupedData[fixedLabel].push({ ...row, groupLabel: fixedLabel })
  });
  return groupedData;
}

const calcStats = (groupedData) => {
  let transformedGroups = {};
  if (groupedData) {
    Object.keys(groupedData).forEach(groupName => {
      transformedGroups[groupName] = [];
      groupedData[groupName].forEach(request => {
        transformedGroups[groupName].push(request.elapsed)
      })
    });
  }
  const stats = Object.keys(transformedGroups).map(groupName => ({
    groupName,
    sum: Math.round(statsLite.sum(transformedGroups[groupName]) * 100) / 100,
    mean: Math.round(statsLite.mean(transformedGroups[groupName]) * 100) / 100,
    median: Math.round(statsLite.median(transformedGroups[groupName]) * 100) / 100,
    mode: statsLite.mode(transformedGroups[groupName]),
    variance: Math.round(statsLite.variance(transformedGroups[groupName]) * 100) / 100,
    standardDeviation: Math.round(statsLite.stdev(transformedGroups[groupName]) * 100) / 100,
    sampleStandardDeviation: Math.round(statsLite.sampleStdev(transformedGroups[groupName]) * 100) / 100,
    percentile: Math.round(statsLite.percentile(transformedGroups[groupName], 0.85) * 100) / 100,
    histogram: Math.round(statsLite.histogram(transformedGroups[groupName], 10) * 100) / 100
  }));

  return stats
}

export const load = ({ data, name }) => async () => {
  const converted = csvToJs(data);
  const correctTypes = converted.map(o => convertjMeterStringsToJsTypes(o));
  const formData = new FormData()

  formData.append('name', name);
  formData.append('testData', JSON.stringify(correctTypes));

  try {
    const url = '/test/create';
    const baseURL = 'http://localhost:8080/api';
    const tests = await axios({
      method: 'POST',
      data: formData,
      baseURL,
      url
    });

    const testId = tests.data.post._id;

    window.location.href = `/#/stats/${testId}`

  } catch (error) {
    console.error(error);
  }
}

export const create = ({ data, name }) => async dispatch => {
  const formData = new FormData()

  formData.append('name', name);
  formData.append('testData', JSON.stringify(data));

  try {
    const url = '/test/create';
    const baseURL = 'http://localhost:8080/api';
    const tests = await axios({
      method: 'POST',
      data: formData,
      baseURL,
      url
    });

    const testId = tests.data.post._id;

    window.location.href = '/#/stats/' + testId

  } catch (error) {
    console.error(error);

  }
}

export const list = () => async dispatch => {
  dispatch({ type: LIST_TESTS_BEGIN })

  const onSuccess = response => {
    dispatch({ type: LIST_TESTS_SUCCESS, payload: response.data })
  }

  const onError = error => {
    dispatch({ type: LIST_TESTS_ERROR, payload: error })
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

export const getDetails = testId => async dispatch => {
  const onSuccess = response => {
    dispatch({ type: 'LOAD_TESTDETAILS_SUCCESS', payload: response.data })
  }

  try {
    dispatch({ type: 'LOAD_TESTDETAILS_BEGIN' })
    const url = `/test/${testId}`
    const baseURL = 'http://localhost:8080/api'
    const testDetails = await axios({ method: 'get', baseURL, url });
    onSuccess(testDetails);
  } catch (error) {
    console.log(error);
  }
}