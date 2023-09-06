import axios from "axios";

const token = localStorage.getItem("jwtToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
