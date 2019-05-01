import { combineReducers } from 'redux';
import benchmarks from './benchmarks/benchmarks'
import toasts from './toasts/toasts'
import details from './details/details'

const rootReducer = combineReducers({
  benchmarks,
  details,
  toasts
})

export default rootReducer