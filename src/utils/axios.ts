import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { key } from "../../config";
import { useAppDispatch } from "../redux/RootStore";
import { GlobalSlice } from "../redux/Slices/Global";
import store from "../redux/RootStore";

interface AuthError extends Error {
  response?: {
    status: number;
    data?: any;
  };
}

const instance = axios.create({
  baseURL: key.URL,
  timeout: 10000, // 타임아웃 설정, 10초 내에 응답이 없으면 에러 처리
});

// 인터셉터 추가(헤더에 token 붙혀서 보내기) ps - 지금 적용하면 서버하고 통신못할수도
instance.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().global.AccessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  }, // 2xx status 코드인 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      // 만약 401 에러가 발생한 경우
      if (!originalRequest._retry) {
        // 요청을 재시도 하지 않은 경우
        originalRequest._retry = true;
        try {
          const acToken = store.getState().global.AccessToken;
          const response = await axios.post(`${key.URL}auth/refresh`, {
            accessToken: acToken, // 시크릿저장소에서 refreshToken을 가져옴
            refreshToken: await SecureStore.getItemAsync("refreshToken"), // 시크릿저장소에서 refreshToken을 가져옴
          });
          const { accessToken, refreshToken } = response.data;
          // 새로운 accessToken, refreshToken을 받아서 저장
          store.dispatch(GlobalSlice.actions.addAToken(accessToken));
          await SecureStore.setItemAsync("refreshToken", refreshToken); // 시크릿저장소에 refreshToken을 저장
          // 기존 요청의 Authorization 헤더에 새로운 accessToken을 담아서 재요청
          // 유저 아이디를 받는지 모르겠음.. 받는데 어떻게 받는지 모름..
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (e) {
          const authError = new Error("Authentication error") as AuthError;
          authError.name = "AuthError";
          authError.response = { status: 401 };
          return Promise.reject(authError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
