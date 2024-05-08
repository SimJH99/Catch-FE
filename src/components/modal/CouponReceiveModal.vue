<template>
  <div v-if="isModalCouponReceiveOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header" style="margin-bottom: 20px;">
        <h2 style="font-size: 40px;  text-align: center;">쿠폰 등록
          <span class="close" @click="closeCouponReceiveModal()">&times;</span>
        </h2>
      </div>
      
      <div class="mb-6">
        <label
          for="employeeNumber"
          class="block text-sm font-medium text-gray-600 margin-left:"
          >쿠폰 번호</label>
        <input
          v-model="code"
          type="text"
          id="code"
          name="code"
          class="mt-4 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
      <form @submit.prevent="doLogin" class="w-full">
        <button
          @click="couponReceive"
          type="submit"
          class="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full"
          style="background-color: #f5a742; margin-top: 1rem;"
        >
        쿠폰 등록
        </button>

        <div class="mt-4 flex w-full items-center justify-end space-x-4">
          <p> 형식에 맞춰 쿠폰 코드를 입력해주세요.</p>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

  
<script>
import axios from "@/axios/index";

export default {
  props: ['isModalCouponReceiveOpen'],
  data() {
    return {
      loading: false,
      isEditing: false,
      code: '',
    };
  },
  methods: {
    async couponReceive() {
      try {
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const data = {
          code: this.code,
        };
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/receive`, data, { headers });
        alert("쿠폰이 정상적으로 등록되었습니다.");
        this.$emit('close-modal'); // 모달을 닫음
        this.code = '';
        this.$router.push("/mypage"); // 페이지 이동
      } catch (error) {
        // alert(error.response.request.responseText.r);
        alert(error.response.data.error.label);
        console.log(error);
      }
    },
    closeCouponReceiveModal() {
      this.isEditing = false; // 수정 상태를 해제
      this.$emit('close-modal');
      this.code = ''; // input 값을 초기화
    },
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
  }

};
</script>
  
<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 300px;
  min-width: 300px;
  text-align: left;
}

.close {
  float: right;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>