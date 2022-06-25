import axios from "axios";

const axiosInstance = new axios.Axios({});

const getAPI = (url: string) => {
  return axiosInstance.get(url);
};

export { getAPI };
