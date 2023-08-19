import axios from "axios";
import { ERROR_CODES } from "../shared/configs/constants";
import { eq } from "lodash";
import ReactGA from "react-ga4";

const request = (() => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || ""}Api/`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
  });

  axiosInstance.interceptors.response.use(null, (error) => {
    const { status } = error.response;

    if (
      eq(status, ERROR_CODES.UNAUTHORIZED) ||
      eq(status, ERROR_CODES.METHOD_NOT_ALLOWED)
    ) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  });

  return axiosInstance;
})();

export default request;
