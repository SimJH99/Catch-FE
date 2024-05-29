<template>
  <div class="container bg-gray-100 min-h-screen flex justify-center items-center">
    <form class="max-w-lg w-full p-6 bg-white rounded-md shadow-md border-3 border-gray-800"
      style="margin-top: 20px; margin-bottom: 20px;">
      <div class="text-white font-bold text-center mb-4"
        style="color: #F5A742; font-size: 3rem; margin-top: 20px; margin-bottom: 20px;">
        계정 생성
      </div>
      <div style="width: 100m; margin-bottom: 50px">
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold text-gray-800 mb-1">이름</label>
          <input v-model="name" type="name" id="name" class="mt-1 p-2 w-full border rounded-md" placeholder="이름을 입력하세요">
        </div>
        <div class="mb-6">
          <label for="employeeNumber" class="block text-sm font-semibold texts-gray-800 mb-1">사원번호</label>
          <div class="flex">
            <input v-model="employeeNumber" :disabled="isEmployeeNumberNotUsed" type="text" id="employeeNumber"
              class="mt-1 p-3 flex-grow border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="사원번호을 입력하세요" />
            <button :disabled="isEmployeeNumberNotUsed" @click.prevent="checkEmployeeNumber"
              :class="{ 'bg-gray-400': isEmployeeNumberNotUsed, 'bg-f5a742': !isEmployeeNumberNotUsed }"
              style="background-color: #F5A742; color: white; border: none"
              class="ml-2 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray">
              {{ isEmployeeNumberNotUsed ? '사용 가능' : '중복 체크' }}
            </button>
          </div>
        </div>
        <div class="mb-6">
          <label for="email" class="block text-sm font-semibold text-gray-800 mb-1">이메일 주소</label>
          <div class="flex">
            <input v-model="email" :disabled="isEmailNotUsed" type="email" id="email"
              class="mt-1 p-3 flex-grow border rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="이메일을 입력하세요">
            <button :disabled="isEmailNotUsed" type="button" @click.prevent="checkEmail"
              :class="{ 'bg-gray-400': !email || !isValidEmail, 'bg-f5a742': isValidEmail }"
              style="background-color: #F5A742; color: white; border: none"
              class="ml-2 px-4 py-2 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray">
              {{ isEmailNotUsed ? '사용 가능' : '중복 체크' }}
            </button>
          </div>
        </div>
        <!-- 비밀번호 입력 -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold text-gray-800 mb-1">비밀번호</label>
          <input v-model="password" type="password" id="password" @input="validatePassword"
            class="mt-1 p-2 w-full border rounded-md">
          <div v-if="passwordErrorMessage" class="text-red-500 text-xs mt-1">{{ passwordErrorMessage }}</div>
          <div v-if="passwordSatisfied" class="text-green-500 text-xs mt-1">비밀번호 요구사항을 만족합니다.</div>
        </div>
        <!-- 비밀번호 확인 입력 -->
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-semibold text-gray-800 mb-1">비밀번호 확인</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" @input="validateConfirmPassword"
            class="mt-1 p-2 w-full border rounded-md">
          <div v-if="confirmPasswordErrorMessage" class="text-red-500 text-xs mt-1">{{ confirmPasswordErrorMessage }}</div>
          <div v-if="confirmPasswordSatisfied" class="text-green-500 text-xs mt-1">비밀번호가 일치합니다.</div>
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-semibold text-gray-800 mb-1">역할</label>
          <select id="role" v-model="role" class="mt-1 p-2 w-full border rounded-md">
            <option value="MARKETER">마케터</option>
            <option value="CS">CS 담당자</option>
          </select>
        </div>
      </div>
      <div class="text-right mt-4">
        <button @click.prevent="createAccount"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          style="width: 200px; background-color: #F5A742">
          생성
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "@/axios/index";
export default {
  data() {
    return {
      name: "",
      employeeNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyId: "",
      role: "MARKETER", // 기본적으로 마케터가 선택되도록 설정
      nameErrorMessage: "", // 이름 유효성 메시지
      isEmailNotUsed: false, // 이메일 중복 여부
      passwordErrorMessage: "", // 비밀번호 유효성 메시지
      confirmPasswordErrorMessage: "", // 비밀번호 확인 메시지
      passwordSatisfied: false, // 비밀번호 요구사항 충족 여부
      confirmPasswordSatisfied: false, // 비밀번호 일치 여부
      isEmployeeNumberChecking: false, // 사원번호 중복 체크 중 여부
      isEmployeeNumberNotUsed: false,
      isEmailChecking: false, // 이메일 중복 체크 중 여부
    };
  },
  computed: {
    isFormValid() {
      return (
        this.name &&
        this.employeeNumber &&
        this.isEmployeeNumberNotUsed &&
        this.email &&
        this.isValidEmail &&
        this.isEmailNotUsed &&
        this.password &&
        this.passwordSatisfied &&
        this.confirmPassword &&
        this.confirmPasswordSatisfied
      );
    },
    isValidEmail() {
      return this.email.includes('@') && this.email.includes('.');
    }
  },
  methods: {
    async checkEmployeeNumber() {
      try {
        if (!this.employeeNumber) {
          window.alert("사원번호를 입력하세요.");
          return;
        }
        this.isEmployeeNumberChecking = true;
        const access_token = localStorage.getItem("access_token");
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/employeeNumberCheck`, { employeeNumber: this.employeeNumber }, { headers });
        if (response.data.result.code === 'EXISTING_EMPLOYEE_NUMBER') {
          this.isEmployeeNumberNotUsed = false;
          this.nameErrorMessage = response.data.result.label;
          window.alert(this.nameErrorMessage);
        } else {
          this.isEmployeeNumberNotUsed = true;
          window.alert("사용 가능한 사원번호 입니다.");
        }
        // isFormValid를 재계산
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isEmployeeNumberChecking = false;
      }
    },
    async checkEmail() {
      try {
        if (!this.email || !this.isValidEmail) {
          window.alert("올바른 이메일 주소를 입력하세요.");
          return;
        }
        this.isEmailChecking = true;
        const access_token = localStorage.getItem("access_token");
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/emailCheck`, { email: this.email }, { headers });
        if (response.data.result.code === 'EXISTING_EMAIL') {
          this.isEmailNotUsed = false;
          this.emailValidMessage = response.data.result.label;
          window.alert(this.emailValidMessage);
        } else {
          this.isEmailNotUsed = true;
          window.alert("사용 가능한 이메일 입니다.");
        }
        // isFormValid를 재계산
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isEmailChecking = false;
      }
    },
    validatePassword() {

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`@$!%*?&])[A-Za-z\d@`$!%~*?&]{8,}$/;
      if (!this.password.match(passwordRegex)) {
        this.passwordErrorMessage = "비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
        this.passwordSatisfied = false;
      } else {
        this.passwordErrorMessage = "";
        this.passwordSatisfied = true;
      }
      if (!this.password) {
        this.passwordErrorMessage = "비밀번호를 입력하세요.";
        this.passwordSatisfied = false;
      }
      // isFormValid를 재계산
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.confirmPasswordErrorMessage = "비밀번호를 다시 입력하세요.";
        this.confirmPasswordSatisfied = false;
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordErrorMessage = "비밀번호가 일치하지 않습니다.";
        this.confirmPasswordSatisfied = false;
      } else {
        this.confirmPasswordErrorMessage = "";
        this.confirmPasswordSatisfied = true;
      }
      // isFormValid를 재계산
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    async createAccount() {
      const FormValid = this.isFormValid;
      try {
        const access_token = localStorage.getItem("access_token");
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const data = {
          name: this.name,
          employeeNumber: this.employeeNumber,
          email: this.email,
          password: this.password,
          companyId: this.companyId,
          role: this.role,
        };
        console.log(data);
        if (!FormValid) {
          alert("모든 입력란을 채워주세요!");
          return;
        }
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/signUp`, data, { headers });
        window.alert(`사원번호: ${this.employeeNumber}\n계정이 생성되었습니다!`);
        window.location.href = "/adminList";
      } catch (error) {
        window.alert(`오류가 발생했습니다. 다시 시도해주세요!`);
      }
    },
  },
};
</script>