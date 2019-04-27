import { createToast } from '../../factories/toastFactory'

const ADD_TOAST = 'jmeterui/toasts/ADD_TOAST'
const REMOVE_TOAST = 'jmeterui/toasts/REMOVE_TOAST'


export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TOAST:
      return [...state, action.payload];
    case REMOVE_TOAST:
      return state.filter(toast => toast.id !== action.payload)
    default:
      return state
  }
}

export const addToast = (options = {}) => ({ type: ADD_TOAST, payload: createToast(options) })

export const removeToast = toastId => ({ type: REMOVE_TOAST, payload: toastId })

export const addAndRemoveToast = (options) => async dispatch => {
  try {
    
    const newToast = createToast(options)
    dispatch({type: ADD_TOAST, payload: newToast})

    const TOAST_DISPLAY_TIME = 3000
    setTimeout(() => dispatch(removeToast(newToast.id)), TOAST_DISPLAY_TIME)

  } catch (error) {

    console.error(error)

  }
} 