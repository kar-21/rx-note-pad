import {
  resetSpinner,
  setAlert,
} from "./../store/ActionCreators/commonState.actionCreators";
import axios from "axios";
import store from "../store/store";
import { AlertLevel } from "../store/Models/commonState.interface";

const axiosInstance = axios.create({});

const getAPI = (url: string, body?: any) => {
  return axiosInstance.get(url, { params: { ...body } });
};

const postAPI = (url: string, body?: {}) => {
  return axiosInstance.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const patchAPI = (url: string, body?: {}) => {
  return axiosInstance.patch(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteAPI = (url: string, body?: {}) => {
  return axiosInstance.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      store.dispatch(
        setAlert({
          message: `Error: ${response.config.url} responded with ${response.status} - ${response.statusText}`,
          level: AlertLevel.warning,
        })
      );
    }
    return response;
  },
  (error) => {
    if (error.response.status >= 400 && error.response.status < 600) {
      store.dispatch(
        setAlert({
          message: `Error: ${error.response.config.url} responded with ${error.response.status} - ${error.response.statusText}`,
          level: AlertLevel.error,
        })
      );
      store.dispatch(resetSpinner());
    } else if (error.code === "ERR_NETWORK") {
      store.dispatch(
        setAlert({
          message: `Error: ${error.config.url} responded with ${error.code} - ${error.message}`,
          level: AlertLevel.error,
        })
      );
      store.dispatch(resetSpinner());
    }
    return error;
  }
);

export { getAPI, postAPI, patchAPI, deleteAPI };
