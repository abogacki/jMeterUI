import * as toasts from "./toasts";
import { createToast } from "../../factories/createToast";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe("toasts", () => {
  describe("toast actions", () => {
    it("should create an action to add a toast", () => {
      const toastOptions = {
        isColor: "danger",
        message: () => "My message"
      };

      const toastAction = toasts.addToast(toastOptions);

      const expectedAction = {
        type: toasts.ADD_TOAST,
        payload: { ...toastOptions, id: toastAction.payload.id }
      };

      expect(toastAction).toEqual(expectedAction);
    });

    it("should create action to remove toast", () => {
      const id = 0;

      const expectedAction = {
        type: toasts.REMOVE_TOAST,
        payload: id
      };

      expect(toasts.removeToast(id)).toEqual(expectedAction);
    });

    it("should create action to add and remove toast", async () => {
      const toastOptions = {
        isColor: "danger",
        message: () => "My message"
      };

      const newToast = createToast(toastOptions);

      const expectedActions = [
        {
          type: toasts.ADD_TOAST,
          payload: { ...newToast, id: newToast.id + 1 }
        },
        { type: toasts.REMOVE_TOAST, payload: newToast.id }
      ];

      const store = mockStore([]);

      const TOAST_DISPLAY_TIME = 5000;
      store.dispatch(toasts.addAndRemoveToast(toastOptions));
      setTimeout(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, TOAST_DISPLAY_TIME);
    });
  });

  describe("toast reducer", () => {
    it("should return initial state", () => {
      expect(toasts.default(undefined, {})).toEqual([]);
    });

    it("should response to ADD_TOAST action", () => {
      const reducer = toasts.default;
      const addToastAction = toasts.addToast({ message: () => "xD" });
      const expectedState = [addToastAction.payload];

      expect(reducer([], addToastAction)).toEqual(expectedState);
    });

    it("should response to REMOVE_TOAST action", () => {
      const reducer = toasts.default;
      const TOAST_ID = 0;
      const expectedState = [
        {
          id: TOAST_ID + 1,
          message: () => "",
          isColor: "red"
        }
      ];
      expect(
        reducer(
          [
            ...expectedState,
            {
              id: TOAST_ID,
              message: () => "",
              isColor: "red"
            }
          ],
          toasts.removeToast(TOAST_ID)
        )
      ).toEqual(expectedState);
    });
  });
});
