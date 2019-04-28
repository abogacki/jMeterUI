import { combineReducers } from 'redux';
import benchmarks from './benchmarks/benchmarks'
import toasts from './toasts/benchmarks'


const rootReducer = combineReducers({
  benchmarks,
  toasts
})

export default rootReducer