import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const EXPIRATION_KEY = 'exp';
let isAlertDisplayed = false; // 얼럿창 표시 여부를 저장하는 변수

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const decodeToken = (token) => {
    if (!token) return null;
    return jwtDecode(token);
};

// Access Token 가져오는 함수
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

// Refresh Token 가져오는 함수
const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

// Access Token 유효성 검증 함수
const isAccessTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;

    const expirationDate = new Date(decodedToken[EXPIRATION_KEY] * 1000);
    const now = new Date();
    const remainingTime = expirationDate.getTime() - now.getTime();

    // **변경 사항:** 만료 시간이 30초 이하 남았으면 만료 처리
    return remainingTime <= 30 * 1000;
};

// Axios Interceptor 설정
axiosInstance.interceptors.request.use(
    async (config) => {
        const AccessToken = getAccessToken();
        if (AccessToken) {
            config.headers.Authorization = `Bearer ${AccessToken}`;
        }
        if (isAccessTokenExpired(getAccessToken())) {
            // Access Token 유효 시 Refresh Token 추가
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                config.headers['refreshToken'] = `Bearer ${refreshToken}`;
            }
        }
        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // 200대 response를 받아 응답 데이터를 가공하는 작업
        return response;
    },
    async (error) => {
        console.log('interceptors 시작');
        const {
            response: { status },
        } = error;
        if (status === 403 && !isAlertDisplayed) {
            isAlertDisplayed = true; // 얼럿창 표시 플래그 설정
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
