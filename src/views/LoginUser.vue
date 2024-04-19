<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">
        회원 로그인
      </h2>

      <div class="mb-4">
        <label
          for="employeeNumber"
          class="block text-sm font-medium text-gray-600"
          >이메일</label
        >
        <input
          v-model="email"
          type="text"
          id="employeeNumber"
          name="employeeNumber"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-600"
          >비밀번호</label
        >
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <form @submit.prevent="doLogin" class="w-full">
        <button
          @click="sendCode"
          type="submit"
          class="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full"
          style="background-color: #f5a742"
        >
          로그인
        </button>

        <div class="mt-4 flex w-full items-center justify-end space-x-4">
          <p>계정 관련 문의는 관리자에게 문의하세요</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken} from "firebase/messaging";


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

        // test
            
        const firebaseConfig = {
          apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
          authDomain: `${process.env.VUE_APP_FIREBASE_AUTH_DOMAIN}`,
          projectId: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}`,
          storageBucket: `${process.env.VUE_APP_FIREBASE_STORAGE_BUCKET}`,
          messagingSenderId: `${process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID}`,
          appId: `${process.env.VUE_APP_FIREBASE_APP_ID}`,
          measurementId: `${process.env.VUE_APP_FIREBASE_MEASUREMENTID}`
        }
            
      const firebase = initializeApp(firebaseConfig);
      const messaging = getMessaging(firebase);

      getToken(messaging,{
        vapidKey: `${process.env.VUE_APP_FIREBASE_VAP_ID}`
      })
      .then((token) => {
      const access_token = localStorage.getItem('access_token');
      const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
      axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/user/pushToken`,
          {
            email: this.email,
            pushToken: token,
          },
          {headers}
        );
        this.pushToken= token;
        console.log('해당 브라우저에서의 토큰 : ', this.pushToken);
      })
      .catch((err) => {
        console.log(err);
      });

        alert("로그인 되었습니다.");
        window.location.href = "/mypage";
        
      } catch (error) {
        console.error(error);
        alert("입력하신 정보와 일치하는 정보가 없습니다.");
      }
    },
    
  },
};
</script>

