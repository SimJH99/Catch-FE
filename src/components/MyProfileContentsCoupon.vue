<template>
  <div class="mys_m_cpn" v-if="coupons.length > 0">
    <h3>쿠폰 <em @click="openMyCouponListModal()" class="cursor-pointer">내 쿠폰보기</em></h3>
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <MyCouponListModal :isModalMyCouponListOpen="isModalMyCouponListOpen" @close-modal="isModalMyCouponListOpen = false" />
      </div>
    </div>
    <div class="mt-8">
      <div class="coupon-slider relative" ref="slider">
        <div class="slider-container relative overflow-hidden">
          <div class="coupons flex">
            <button @click="prevCoupon" class="arrow prev text-white bg-custom-F5A742 hover:bg-orange-600 p-2">&larr;</button>
            <div v-for="(coupon, index) in visibleCoupons" :key="index" class="coupon relative">
              <div class="coupon-content">
                <p class="coupon-name">{{ coupon.name }}</p>
              </div>
              <button class="receive-button" @click="receiveCoupon(coupon)">수령</button>
            </div>
            <button @click="nextCoupon" class="arrow next text-white bg-custom-F5A742 hover:bg-orange-600 p-2">&rarr;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No coupons available</p>
  </div>
</template>

<script>
import axios from "@/axios/index";
import MyCouponListModal from "@/components/modal/MyCouponListModal.vue";

export default {
  components: {
    MyCouponListModal
  },
  data() {
    return {
      currentIndex: 0,
      coupons: [],
      intervalId: null, // Interval ID for auto-scrolling
      isModalMyCouponListOpen: false,
    };
  },
  created() {
    this.loadCoupons();
    // Start auto-scrolling
    this.intervalId = setInterval(this.nextCoupon, 5000); // Change interval as needed
  },
  unmounted() {
    // Clear interval when component is unmounted to prevent memory leaks
    clearInterval(this.intervalId);
  },
  computed: {
    visibleCoupons() {
      const visibleCoupons = [];
      const numCoupons = this.coupons.length;
      for (let i = 0; i < 4; i++) {
        const index = (this.currentIndex + i) % numCoupons;
        visibleCoupons.push(this.coupons[index]);
      }
      return visibleCoupons;
    }
  },
  methods: {
    async loadCoupons() {
      try {
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/receivable`, { headers });
        this.coupons = response.data.result.data;
      } catch (error) {
        console.log(error);
      }
    },
    prevCoupon() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.coupons.length - 1;
      } else {
        this.currentIndex--;
      }
    },
    nextCoupon() {
      if (this.currentIndex === this.coupons.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    async receiveCoupon(coupon) {
      try {
        console.log(coupon.code);
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const data = {
          code: coupon.code,
        };
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/receive`, data, { headers });
        console.log(response);
        alert(response.data.message.label);
        window.location.reload();
      } catch (error) {
        alert(error.response.data.error.label);
        console.log(error);
      }
    },
    openMyCouponListModal() {
      this.isModalMyCouponListOpen = true;
      console.log("List에서 클릭하면 열리는지 여부: ",this.isModalMyCouponListOpen);
    },
    closeMyCouponListModal() {
      this.isModalMyCouponListOpen = false;
      console.log(this.isModalMyCouponListOpen);
    },
  },
};
</script>

<style scoped>
.mys_m_cpn {
  clear: both;
  overflow: hidden;
  position: relative;
  margin-bottom: 50px;
}

.mys_m_cpn h3 {
  margin-bottom: 20px;
  font-size: 26px;
  line-height: 32px;
  color: #191919;
  letter-spacing: 0;
}
.mys_m_cpn h3 em{font-size:13px;line-height:38px;color:#505050;}

.my_m_wrap {
  overflow: hidden;
  width: 1016px;
}

.coupon {
  width: 25%; /* 4개의 쿠폰을 가로로 정렬 */
  background-color: #FFF4E6; /* 배경색 변경 */
  border-radius: 10px;
  padding: 20px;
  margin-right: 10px; /* 쿠폰 간격을 조정 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.coupon-content {
  text-align: center; /* 쿠폰 내용 가운데 정렬 */
}

.coupon-name {
  font-size: 20px; /* 쿠폰 이름 폰트 사이즈 변경 */
  color: #FFA500; /* 쿠폰 이름 색상 변경 */
}

.receive-button {
  background-color: #FFA500; /* 버튼 배경색 변경 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.receive-button:hover {
  background-color: #FF8C00; /* 버튼 호버 배경색 변경 */
}
</style>
