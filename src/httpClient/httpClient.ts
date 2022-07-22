import axios from "axios";

const axiosInstance = axios.create({});

axios.defaults.headers.post["Content-Type"] = "application/json";

const getAPI = (url: string, body?: any) => {
  return axiosInstance.get(url, { params: { ...body } });
};

const postAPI = (url: string, body?: {}) => {
  console.log(body);
  return axiosInstance.post(url, body);
};

export { getAPI, postAPI };
