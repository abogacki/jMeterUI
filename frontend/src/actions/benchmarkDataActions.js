import { csvTojs } from '../helpers/csvTojs'
import axios from 'axios'

// action types - refactorable
const LIST_TESTS_BEGIN = "LIST_TESTS_BEGIN"
const LIST_TESTS_SUCCESS = "LIST_TESTS_SUCCESS"
const LIST_TESTS_ERROR = "LIST_TESTS_ERROR"

export const load = ({ data }) => dispatch => {
    // console.log(data);
    const converted = csvTojs(data);
    const payload = { sourceFile: 'test.csv', data: converted }
    dispatch({ type: 'LOAD_BENCHMARK', payload })
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

        const url = '/tests'
        const baseURL = 'http://localhost:8080/api'
        const tests = await axios({ method: 'get', baseURL, url })

        onSuccess(tests);

    } catch (error) {

        onError(error);

    }

}
