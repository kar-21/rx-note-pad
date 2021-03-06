import axios from "axios";

const axiosInstance = axios.create({});

const getAPI = (url: string, body?: any) => {
  return axiosInstance.get(url, { params: { ...body } });
};

const postAPI = (url: string, body?: {}) => {
  console.log(body);
  return axiosInstance.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const patchAPI = (url: string, body?: {}) => {
  console.log(body);
  return axiosInstance.patch(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteAPI = (url: string, body?: {}) => {
  console.log(body);
  return axiosInstance.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });
};

export { getAPI, postAPI, patchAPI, deleteAPI };
