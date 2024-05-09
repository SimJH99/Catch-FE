<template>
  <div class="container bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="max-w-lg w-full p-6 bg-white rounded-md shadow-md border-3 border-gray-800"
      style="margin-top: 20px; margin-bottom: 20px;">
      <div class="text-white font-bold text-center mb-4"
        style="color: #f5a742; font-size: 3rem; margin-top: 20px; margin-bottom: 20px;">
        쿠폰 생성
      </div>
      <div style="width: 100m; margin-bottom: 50px">
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold text-gray-800 mb-1">쿠폰명</label>
          <input type="text" id="name" name="name" v-model="name" class="mt-1 p-2 w-full border rounded-md"
            maxlength="25" placeholder="쿠폰명을 입력하세요">
        </div>
        <div class="mb-6">
          <label for="employeeNumber" class="block text-sm font-semibold texts-gray-800 mb-1">수량</label>
          <div class="flex">
            <input v-model="quantity" type="text" id="quantity" class="mt-1 p-2 w-full border rounded-md"
              placeholder="수량을 입력하세요" min="1" :max="1000000000" />
          </div>
        </div>
        <div class="mb-6">
          <label for="employeeNumber" class="block text-sm font-semibold texts-gray-800 mb-1">가격</label>
          <div class="flex">
            <input v-model="price" type="text" id="price" class="mt-1 p-2 w-full border rounded-md"
              placeholder="가격을 입력하세요" min="1" :max="10000000000" />
          </div>
        </div>
        <div class="mb-6">
          <label for="email" class="block text-sm font-semibold text-gray-800 mb-1">시작일</label>
          <input type="date" id="startDate" v-model="startDate" class="m-1 p-1 rounded-md w-48 outline-none">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold text-gray-800 mb-1">마감일</label>
          <input type="date" id="endDate" v-model="endDate" class="m-1 p-1 rounded-md w-48 outline-none">
        </div>
      </div>
      <div class="text-right mt-4">
        <button @click="couponCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          style="width: 200px; text-align: center; background-color: #F5A742;">생성</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
export default {
  data() {
    return {
      name: '',
      quantity: '',
      price: '',
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    async couponCreate() {
      try {
        if (!this.name) {
          alert("쿠폰명을 입력하세요.");
        } else if (this.quantity < 1 || this.quantity > 1000000000) {
          alert("수량은 1에서 99999 사이의 값을 입력하세요.");
        } else if (this.price < 1 || this.price > 10000000000) {
          alert("가격은 1에서 10,000,000,000 사이의 값을 입력하세요.");
        } else if (!this.startDate) {
          alert("쿠폰 시작일을 선택하세요.");
        } else if (!this.endDate) {
          alert("쿠폰 종료일을 입력하세요.");
        } else {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() - 1);

          // 시작일이 현재 날짜 이전이거나 같은 경우
          if (new Date(this.startDate) < currentDate) {
            alert('시작일은 현재 날짜 이후여야 합니다.');
            return;
          }
          // 종료일이 현재 날짜 이전이거나 같은 경우
          if (new Date(this.endDate) < currentDate) {
            alert('종료일은 현재 날짜 이후여야 합니다.');
            return;
          }
          // 시작일이 종료일보다 이른 경우
          if (new Date(this.startDate) > new Date(this.endDate)) {
            alert('시작일은 종료일보다 이전이어야 합니다.');
            return;
          }
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          const data = {
            name: this.name,
            quantity: this.quantity,
            price: this.price,
            startDate: this.startDate,
            endDate: this.endDate,
          };
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/create`, data, { headers });
          this.$router.push("/couponList");
        }
      } catch (error) {
        alert(error.response.data.error.label)
        console.log(error);
      }
    },



  },
}
</script>

<style></style>