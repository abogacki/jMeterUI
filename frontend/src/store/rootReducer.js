import {combineReducers} from 'redux';
import benchmarkData from '../reducers/benchmarkDataReducer'
import tests from '../reducers/testsReducer'
import compare from '../reducers/compareReducer'

const rootReducer = combineReducers({
    benchmarkData,
    tests,
    compare
})

export default rootReducer