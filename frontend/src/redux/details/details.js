/**
 * This is an implementation of redux-ducks
 * see https://github.com/erikras/ducks-modular-redux for more info
 */

import axios from "axios";

const initialState = {
  groupedData: {},
  groupedStats: [],
  testData: [],
  _doc: {
    createdAt: "",
    name: ""
  },
  isLoading: false
};

const UPDATE = "jmeterui/details/UPDATE";
const GET_BEGIN = "jmeterui/details/GET_BEGIN";
const GET_SUCCESS = "jmeterui/details/GET_SUCCESS";
const GET_ERROR = "jmeterui/details/GET_ERROR";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BEGIN:
      return { ...state, isLoading: true };
    case GET_ERROR:
      console.error(action.payload);
      return { ...state, isLoading: false };
    case GET_SUCCESS:
      return { ...state, isLoading: false };
    case UPDATE:
      return {
        _doc: action.payload._doc,
        testData: action.payload.testData
      };
    default:
      return state;
  }
}

export const getBegin = () => ({ type: GET_BEGIN });

export const getSuccess = () => ({ type: GET_SUCCESS });

export const getError = message => ({ type: GET_ERROR, payload: message });

export const updateDetails = testDetails => ({
  type: UPDATE,
  payload: testDetails
});

export const getDetails = testId => async dispatch => {
  const onSuccess = response => {
    dispatch(getSuccess());
    dispatch(updateDetails(response.data));
  };

  try {
    dispatch(getBegin());

    const url = `/test/${testId}`;
    const baseURL = "http://localhost:8080/api";
    const response = await axios({ method: "get", baseURL, url });
    onSuccess(response);
  } catch (error) {
    dispatch(getError(error));
  }
};
