import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/RootReducer";
import { key } from "../../config";
import { useAppDispatch } from "../redux/RootStore";
import { GlobalSlice } from "../redux/Slices/Global";

const instance = axios.create({
  baseURL: key.URL,
  timeout: 10000, // 타임아웃 설정, 10초 내에 응답이 없으면 에러 처리
});

instance.interceptors.response.use(
  (response) => response, // 2xx status 코드인 경우 그대로 반환
  async (error) => {
    const global = useSelector((state: RootState) => state.global);
    const dispatch = useAppDispatch();
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      // 만약 401 에러가 발생한 경우
      if (!originalRequest._retry) {
        // 요청을 재시도 하지 않은 경우
        originalRequest._retry = true;
        try {
          const response = await axios.post(`${URL}/auth/refresh`, {
            refreshToken: await SecureStore.getItemAsync("refreshToken"), // 시크릿저장소에서 refreshToken을 가져옴
          });
          const { accessToken, refreshToken } = response.data;
          // 새로운 accessToken, refreshToken을 받아서 저장
          dispatch(GlobalSlice.actions.addAToken(accessToken));
          await SecureStore.setItemAsync("refreshToken", refreshToken); // 시크릿저장소에 refreshToken을 저장
          // 기존 요청의 Authorization 헤더에 새로운 accessToken을 담아서 재요청
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (e) {
          // refreshToken 재발급 실패시 로그아웃 처리 등 필요한 작업 수행
          // ...
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
