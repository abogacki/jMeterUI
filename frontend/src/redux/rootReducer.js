import { combineReducers } from 'redux';
import benchmarks from './benchmarks/index'
import toasts from './toasts/index'


const rootReducer = combineReducers({
  benchmarks,
  toasts
})

export default rootReducer