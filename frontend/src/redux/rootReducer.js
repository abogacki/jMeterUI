import { combineReducers } from 'redux';
import benchmarks from './ducks/benchmarks'


const rootReducer = combineReducers({benchmarks})

export default rootReducer