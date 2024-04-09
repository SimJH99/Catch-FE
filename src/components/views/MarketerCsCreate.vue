<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="container mb-4 border border-gray-300 bg-white"
      style="
        width: 90%;
        max-width: auto;
        padding: 20px;
        border-color: #cccccc;
        height: 90vh;
      "
    >
      <div
        class="text-white font-bold text-center mb-4"
        style="
          color: #f5a742;
          font-size: 3rem;
          margin-top: 50px;
          margin-bottom: 50px;
        "
      >
        계정 생성
      </div>
      <div
        class="flex items-center flex-col space-y-4"
        style="width: 100m; margin-bottom: 50px"
      >
        <div class="flex items-center">
          <label for="name" class="w-1/4">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
            style="background-color: #dddddd; height: 2rem; width: 400px"
          />
        </div>
        <div class="flex items-center">
          <label for="employeeNumber" class="w-1/4">사원번호:</label>
          <input
            type="text"
            id="employeeNumber"
            name="employeeNumber"
            v-model="employeeNumber"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
            style="background-color: #dddddd; height: 2rem; width: 400px"
          />
        </div>
        <div class="flex items-center">
          <label for="email" class="w-1/4">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
            style="background-color: #dddddd; height: 2rem; width: 400px"
          />
        </div>
        <div class="flex items-center">
          <label for="password" class="w-1/4">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
            style="background-color: #dddddd; height: 2rem; width: 400px"
          />
        </div>
        <div class="flex items-center">
          <label for="role" class="w-1/4">역할:</label>
          <select
            id="role"
            v-model="role"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
            style="background-color: #dddddd; height: 2rem; width: 400px"
          >
            <option value="MARKETER">마케터</option>
            <option value="CS">CS 담당자</option>
          </select>
        </div>
      </div>
      <div class="text-right mt-4">
        <button
          @click="createAccount"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          style="width: 200px; background-color: #f5a742"
        >
          생성
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      employeeNumber: "",
      email: "",
      password: "",
      companyId: "",
      role: "MARKETER", // 기본적으로 마케터가 선택되도록 설정
    };
  },
  methods: {
    async createAccount() {
      try {
        const access_token = localStorage.getItem("access_token");
        const headers = access_token
          ? { Authorization: `Bearer ${access_token}` }
          : {};
        const data = {
          name: this.name,
          employeeNumber: this.employeeNumber,
          email: this.email,
          password: this.password,
          companyId: this.companyId,
          role: this.role,
        };
        console.log(data);
        await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/admin/signUp`,
          data,
          { headers }
        );
        window.alert(`사원번호: ${this.employeeNumber}\n계정이 생성되었습니다!`);
      } catch (error) {
        window.alert(`오류가 발생했습니다. 다시 시도해주세요!`);
      }
    },
  },
};
</script>