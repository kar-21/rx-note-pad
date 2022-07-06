import axios from "axios";

const axiosInstance = new axios.Axios({});

const getAPI = (url: string, body?: any) => {
  return axiosInstance.get(url, { params: { ...body } });
};

export { getAPI };
