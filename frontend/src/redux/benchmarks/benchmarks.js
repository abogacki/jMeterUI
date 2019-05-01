import axios from 'axios'
import { csvToJs } from '../../helpers/csvTojs'
import { addAndRemoveToast } from '../toasts/toasts'

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

// make nested reducers for data called "details", and for list
const initialState = {
  test: {
    list: [],
    isLoading: false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_BENCHMARKS:
      return { ...state, test: { ...state.test, list: action.payload.test } }
    default:
      return state
  }
}

export const createFromFile = ({ data, name }) => async dispatch => {
  const benchmarkDataObject = csvToJs(data);
  dispatch(create({ name, data: benchmarkDataObject }))
}

export const createFromForm = formData => async dispatch => {
  window.location.href = '/#/'
  // here send form data to backend, than retrive created benchmark data
  console.log(formData);
  dispatch(addAndRemoveToast({ message: () => 'This feature is not yet implemented', isColor: 'danger' }))
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
    const response = await axios({ method: 'get', baseURL, url })
    onSuccess(response);
  } catch (error) {
    console.error(error);
  }
}