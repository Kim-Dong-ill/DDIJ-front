import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_NODE_SERVER_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken"); //Bearer 토큰 의 형식으로 저장한다.
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
