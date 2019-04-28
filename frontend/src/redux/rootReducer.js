import { combineReducers } from 'redux';
import benchmarks from './benchmarks/benchmarks'
import toasts from './toasts/toasts'


const rootReducer = combineReducers({
  benchmarks,
  toasts
})

export default rootReducer