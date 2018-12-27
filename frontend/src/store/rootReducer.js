import {combineReducers} from 'redux';
import benchmarkData from '../reducers/benchmarkDataReducer'
import tests from '../reducers/testsReducer'

const rootReducer = combineReducers({
    benchmarkData,
    tests
})

export default rootReducer