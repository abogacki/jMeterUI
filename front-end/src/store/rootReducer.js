import {combineReducers} from 'redux';
import benchmarkData from '../reducers/benchmarkDataReducer'

const rootReducer = combineReducers({
    benchmarkData
})

export default rootReducer