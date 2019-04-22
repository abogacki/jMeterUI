import { csvToJs } from '../../helpers/csvTojs'
import axios from 'axios'
import {
  LIST_TESTS_BEGIN,
  LIST_TESTS_SUCCESS,
  LIST_TESTS_ERROR
} from './actionTypes'

const convertTypes = object => {
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

export const load = ({ data, name }) => async dispatch => {
  const converted = csvToJs(data);
  const correctTypes = converted.map(o => convertTypes(o));
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