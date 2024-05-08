<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">
        관리자 로그인
      </h2>

      <div class="mb-4">
        <label for="employeeNumber" class="block text-sm font-medium text-gray-600">사원번호</label>
        <input v-model="employeeNumber" type="text" id="employeeNumber" name="employeeNumber"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-600">비밀번호</label>
        <input v-model="password" type="password" id="password" name="password"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div class="mb-6" v-if="timer > 0" v-show="validateLogin">
        <label for="code" class="block text-sm font-medium text-gray-600">인증 코드</label>
        <div class="flex">
          <input v-model="code" type="text" id="code"
            class="mt-1 p-3 flex-grow border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="코드를 입력해주세요." />
          <button @click="checkEmailCode" style="background-color: #f5a742; color: white; border: none"
            class="ml-2 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray">
            확인
          </button>
        </div>
        <p class="text-red-600" v-if="loginAttempts < 5">
          남은 시도 횟수: {{ 5 - loginAttempts }}
        </p>
      </div>
      <p class="text-red-600" v-else-if="validateLogin">
        인증코드를 5회 이상 잘못 입력하셨습니다.
      </p>
      <form @submit.prevent="doLogin" class="w-full">
        <button type="submit"
          class="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full"
          style="background-color: #f5a742" :disabled="timer > 0">
          {{
            timer > 0 ? timer + "초 내에 인증번호를 입력해주세요." : "로그인"
          }}
        </button>
        <div class="mt-4 flex w-full items-center justify-end space-x-4">
          <p>계정 관련 문의는 <b style="color:#f5a742">시스템 관리자</b>에게 문의하세요</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employeeNumber: "",
      password: "",
      code: "",
      eventSource: null,
      showEmailPopup: false,
      loginError: false,
      isLogin: false,
      validateLogin: false,
      emailCodeChecked: false,
      timer: 0,
      intervalId: null,
      loginAttempts: 0, // 실패 횟수를 저장할 변수 추가
    };
  },
  methods: {
    async doLogin() {
      try {
        if (this.employeeNumber === "9999-99991" || this.employeeNumber === "9999-99992" || this.employeeNumber === "9999-99993") {
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/superLogin`, {
            employeeNumber: this.employeeNumber,
            password: this.password,
          });
          if (response.status === 200) {
            const result = response.data;
            console.log(response.data);
            if (result.message.code === "SUCCESS_LOGIN") {
              localStorage.setItem("access_token", result.result.access_token);
              localStorage.setItem("refresh_token", result.result.refresh_token);
              alert("인증을 성공했습니다.");
              this.emailCodeChecked = true;
              clearInterval(this.intervalId);
              window.location.href = "/dashBoard";
            }
          }
          return; // 슈퍼 계정으로 로그인을 시도했으면 더 이상 진행하지 않음
        }
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/doLogin`, {
          employeeNumber: this.employeeNumber,
          password: this.password,
        });
        this.validateLogin = true; // 로그인 성공 시 검증 완료
        // 로그인 성공 후 타이머 시작
        this.startTimer();
        alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");
        this.sendCode(); // 검증이 완료된 후에 메일을 보냄
      } catch (error) {
        const errorMessage = error.response.data.error.label;
        console.log(errorMessage);
        alert(errorMessage);
      }
    },


    async sendCode() {
      try {
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/mailSend`, {
          employeeNumber: this.employeeNumber,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async checkEmailCode() {
      try {
        if (!this.code) {
          alert("코드를 입력해주세요.");
          return;
        }
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/admin/mailAuthCheck`,
          {
            employeeNumber: this.employeeNumber,
            authNumber: this.code,
          }
        );

        if (response.status === 200) {
          const result = response.data;
          console.log(response.data);
          if (result.message.code === "SUCCESS_LOGIN") {
            localStorage.setItem("access_token", result.result.access_token);
            localStorage.setItem("refresh_token", result.result.refresh_token);
            alert("인증을 성공했습니다.");
            this.emailCodeChecked = true;
            clearInterval(this.intervalId);
            window.location.href = "/dashBoard";
          } else {
            alert("인증코드가 잘못되었습니다. 다시 입력해주세요.");
            this.loginAttempts++; // 인증코드가 잘못된 경우 실패 횟수 증가
            if (this.loginAttempts >= 5) {
              alert(
                "인증코드를 5회 이상 잘못 입력하셨습니다. 다시 시도해주세요."
              );
              this.validateLogin = false; // 인증 시도 횟수가 5회 이상이면 validateLogin을 false로 설정하여 얼럿 창이 사라지도록 함
              window.location.href = "/";
            }
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        alert("이메일 확인에 실패했습니다. 다시 시도해주세요.");
      }
    },

    startTimer() {
      this.timer = 180; // 3분으로 타이머 설정
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.intervalId);
          alert("인증 시간이 만료되었습니다.");
          this.timer = 0;
          // 타이머 종료 후 validateLogin 값을 false로 설정하여 알림 창 닫기
          this.validateLogin = false;
        }
      }, 1000);
    },
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 키 동작을 막음
        if (!this.validateLogin) { // 검증되지 않은 경우에만 로그인 시도
          this.doLogin(); // 로그인 함수 호출
        } else { // 검증되었지만 이메일 검증 확인 버튼에 포커스가 있는 경우
          this.checkEmailCode(); // 이메일 검증 확인 함수 호출
        }
      }
    });
  },




};
</script>
