import axios from "axios";
import { csvToJs } from "../../helpers/csvTojs";
import { addAndRemoveToast } from "../toasts/toasts";

// attach start time to requests
axios.interceptors.request.use(
  config => {
    config.metadata = { startTime: new Date() };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// attach end time to requests
axios.interceptors.response.use(
  response => {
    response.config.metadata.endTime = new Date();
    response.elapsed =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  error => {
    error.config.metadata.endTime = new Date();
    error.elapsed = 0;
    return Promise.reject(error);
  }
);

const UPDATE = "jmeterui/benchmarks/UPDATE";
const LOADING_BEGIN = "jmeterui/benchmarks/LOADING_BEGIN";
const LOADING_END = "jmeterui/benchmarks/LOADING_END";

const initialState = {
  list: [],
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_BEGIN:
      return { ...state, isLoading: true };
    case LOADING_END:
      return { ...state, isLoading: false };
    case UPDATE:
      return { ...state, list: action.payload.test };
    default:
      return state;
  }
}

export const createFromFile = ({ data, name }) => async dispatch => {
  const benchmarkDataObject = csvToJs(data);
  dispatch(create({ name, data: benchmarkDataObject }));
};

export const createFromForm = formData => async dispatch => {
  window.location.href = "/#/";
  // here send form data to backend, than retrive created benchmark data
  alert(JSON.stringify(formData));
  dispatch(
    addAndRemoveToast({
      message: () => "This feature is not yet implemented",
      isColor: "danger"
    })
  );
};

export const create = ({ data, name }) => async () => {
  const newData = new FormData();
  newData.append("name", name);
  newData.append("testData", JSON.stringify(data));

  try {
    const url = "/test/create";
    const baseURL = "http://localhost:8080/api";
    const response = await axios({
      method: "POST",
      data: newData,
      baseURL,
      url
    });

    const testId = response.data.post._id;

    // navigate to new request
    window.location.href = "/#/details/" + testId;
  } catch (error) {
    console.error(error);
  }
};

export const update = payload => ({ type: UPDATE, payload });

export const loadingBegin = () => ({ type: LOADING_BEGIN });

export const loadingEnd = () => ({ type: LOADING_END });

export const getList = () => async dispatch => {
  const onSuccess = response => {
    dispatch(update(response.data));
  };

  try {
    const url = "/test/list";
    const baseURL = "http://localhost:8080/api";
    const response = await axios({ method: "get", baseURL, url });

    dispatch(loadingBegin());
    onSuccess(response);
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(loadingEnd());
  }
};
