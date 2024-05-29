<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">
        회원 로그인
      </h2>
      <div class="mb-4">
        <label for="employeeNumber" class="block text-sm font-medium text-gray-600">이메일</label>
        <input v-model="email" type="text" id="employeeNumber" name="employeeNumber"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500" />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-600">비밀번호</label>
        <input v-model="password" type="password" id="password" name="password"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500" />
      </div>
      <form @submit.prevent="doLogin" class="w-full">
        <button @click="sendCode" type="submit"
          class="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full"
          style="background-color: #F5A742">
          로그인
        </button>
        <div class="mt-4 flex w-full items-center justify-between">
          <div>
            <a href="#" class="text-sm text-gray-500 hover:text-gray-700">아이디 찾기</a>
            <span class="text-gray-500 mx-1">|</span>
            <a href="#" class="text-sm text-gray-500 hover:text-gray-700">비밀번호 찾기</a>
          </div>
          <a href="/admin/login" class="text-sm text-gray-500 hover:text-gray-700">관리자 이신가요?</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
export default {
  data() {
    return {
      email: "",
      password: "",
      eventSource: null,
      loginError: false,
      isLogin: false,
      validateLogin: false,
      emailCodeChecked: false,
      intervalId: null,
    };
  },
  methods: {
    async doLogin() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/doLogin`, {
          email: this.email,
          password: this.password,
        });
        const result = response.data;
        localStorage.setItem("access_token", result.result.access_token);
        localStorage.setItem("refresh_token", result.result.refresh_token);
        let queryString = window.location.search;
        console.log(queryString);
        let urlParams = new URLSearchParams(queryString);
        console.log(urlParams);
        let url;
        if (urlParams.has('url')) {
          url = urlParams.get('url');
        }
        if (url == undefined) {
          alert("로그인 되었습니다.");
          window.location.href = "/mypage";
        } else {
          window.location.href = `/${url}`;
        }
      } catch (error) {
        const errorMessage = error.response.data.error.label;
        console.log(errorMessage);
        alert(errorMessage);
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 키 동작을 막음
        this.doLogin(); // 로그인 함수 호출
      }
    });
  },
};
</script>