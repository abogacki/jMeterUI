import * as toasts from './toasts'
import { createToast } from '../../factories/createToast'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

describe('toasts', () => {
  describe('toast actions', () => {
    it('should create an action to add a toast', () => {
      const toastOptions = {
        isColor: 'danger',
        message: () => 'My message'
      }

      const toastAction = toasts.addToast(toastOptions)

      const expectedAction = {
        type: toasts.ADD_TOAST,
        payload: { ...toastOptions, id: toastAction.payload.id }
      }

      expect(toastAction).toEqual(expectedAction)
    })

    it('should create action to remove toast', () => {
      const id = 0

      const expectedAction = {
        type: toasts.REMOVE_TOAST,
        payload: id
      }

      expect(toasts.removeToast(id)).toEqual(expectedAction)

    })

    it('should create action to add and remove toast', async () => {
      const toastOptions = {
        isColor: 'danger',
        message: () => 'My message'
      }

      const newToast = createToast(toastOptions)

      const expectedActions = [
        { type: toasts.ADD_TOAST, payload: { ...newToast, id: newToast.id + 1 } },
        { type: toasts.REMOVE_TOAST, payload: newToast.id }
      ]

      const store = mockStore([])

      const TOAST_DISPLAY_TIME = 5000
      store.dispatch(toasts.addAndRemoveToast(toastOptions))
      setTimeout(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }, TOAST_DISPLAY_TIME)

    })
  })
})