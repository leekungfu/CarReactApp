import axios from "axios";
import { ERROR_CODES } from "src/shared/configs/constants";
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
      window.location.href = "/account";
    }

    return Promise.reject(error);
  });

  return axiosInstance;
})();

export const withDownload = (url, fileName) => {
  const result = async () => {
    const { data, headers } = await axios({
      url,
      method: "GET",
      responseType: "blob", // important
    });

    const downloadedFilename = headers["x-filename"] || fileName;
    const downloadUrl = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", downloadedFilename);
    document.body.appendChild(link);
    link.click();

    ReactGA.event({
        category: "Reports",
        action: "Download",
        label: downloadedFilename.includes("xlsx") ? "Excel" : "Pdf",
    });
  };

  return result;
};

export default request;
