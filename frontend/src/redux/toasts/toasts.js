import { createToast } from '../../factories/createToast'

export const ADD_TOAST = 'jmeterui/toasts/ADD_TOAST'
export const REMOVE_TOAST = 'jmeterui/toasts/REMOVE_TOAST'

export default function reducer(state = [{isColor: 'primary', message: () => 'Welcome to jMeter UI !'}], action) {
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

export const addAndRemoveToast = (options = {}) => async dispatch => {
  try {
    
    const newToast = addToast(options)
    dispatch(newToast)

    const TOAST_DISPLAY_TIME = 5000
    await setTimeout(() => dispatch(removeToast(newToast.payload.id)), TOAST_DISPLAY_TIME)

  } catch (error) {

    console.error(error)
    
  }
}