<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">
        쿠폰 등록
      </h2>

      <div class="mb-4">
        <label
          for="employeeNumber"
          class="block text-sm font-medium text-gray-600"
          >쿠폰 번호</label>
        <input
          v-model="code"
          type="text"
          id="code"
          name="code"
          class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
      </div>

      <form @submit.prevent="doLogin" class="w-full">
        <button
          @click="couponReceive"
          type="submit"
          class="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full"
          style="background-color: #f5a742"
        >
        쿠폰 등록
        </button>

        <div class="mt-4 flex w-full items-center justify-end space-x-4">
          <p> 형식에 맞춰 쿠폰 코드를 입력해주세요.</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";

export default {
  data() {
    return {
      code: '',
    };
  },
  methods: {
    async couponReceive(){
            try{
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? { Authorization: `Bearer ${access_token}`} : {};
                const data = {
                    code: this.code,
                };
                alert("쿠폰이 정상적으로 등록되었습니다.")
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/receive`, data ,{headers});
            }catch(error){
                console.log(error);
            }
            this.$router.push("/mypage");
        },
  },
};
</script>

