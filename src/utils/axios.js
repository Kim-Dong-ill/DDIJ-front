import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
  // 다른 페이지 넘어갈때 냅다 끼어들음
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    // 띄어쓰기 기준으로 Bearer  /  local~ 이렇게 두개로 나뉜다
    // local~ 쪽이 token
    // authHeader에 bearer 공백 token이 통으로 들어감.............!
    // back의 auth.js랑 계속 연관지어서 볼 것!
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
