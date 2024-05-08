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
          <div class="coupons flex" style="height: 160px;">
            <button @click="prevCoupon" class="arrow prev p-2" style="margin-right:10px; border-radius: 5px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>                          
            </button>
            <div v-for="(coupon, index) in visibleCoupons" :key="index" class="coupon">
              <div class="coupon-wrapper">
                <img src="@/assets/coupon_image.png" alt="Coupon Image" class="coupon-image">
                <div class="coupon-content">
                  <p class="coupon-name">{{ truncateText(coupon.name, 10) }}</p>
                  <p class="coupon-price">{{ coupon.price }}원</p>
                </div>
              </div> 
              <button class="receive-button" @click="receiveCoupon(coupon)">
                <span>쿠폰 받기</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </button>
            </div>
            <button @click="nextCoupon" class="arrow next p-2" style="margin-left:10px; border-radius: 5px">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>              
            </button>
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
      const numCoupons = this.coupons.length;
      if (numCoupons <= 4) {
        return this.coupons;
      } else {
        const visibleCoupons = [];
        for (let i = 0; i < 4; i++) {
          const index = (this.currentIndex + i) % numCoupons;
          visibleCoupons.push(this.coupons[index]);
        }
        return visibleCoupons;
      }
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
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text;
      }
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

.coupon-image {
  width: 100%; /* 이미지를 쿠폰 박스 안에 꽉 차게 표시 */
  height: 120px; /* 이미지를 쿠폰 박스 안에 꽉 차게 표시 */
  object-fit: cover; /* 이미지가 박스에 꽉 차도록 설정 */
  border-radius: 5px; /* 쿠폰 박스와 이미지의 모서리를 일치시킴 */
  background-color: #FFFFFF; /* 배경색 변경 */
  border: 1px solid #CCCCCC; /* 테두리 추가 */
}

.coupon {
  margin-top: 5px;
  position: relative; /* 이미지 위치를 조정하기 위해 필요 */
  height: 100px; /* 이미지 높이에 맞게 조정 */
  width: 25%; /* 4개의 쿠폰을 가로로 정렬 */
  border-radius: 10px; /* 모서리 둥글게 처리 */
  margin-right: 10px; /* 쿠폰 간격을 조정 */
  margin-left: 10px; /* 쿠폰 간격을 조정 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}
.coupon-wrapper {
  position: relative;
}

.coupon-content {
  position: absolute;
  top: 10px; /* 쿠폰 이미지 상단으로부터의 간격 조정 */
  left: 10px; /* 쿠폰 이미지 왼쪽으로부터의 간격 조정 */
  z-index: 1; /* 다른 콘텐츠 위에 배치 */
  background-color: rgba(255, 255, 255, 0.8); /* 배경색 및 투명도 설정 */
  padding: 5px; /* 내부 여백 조정 */
  border-radius: 5px; /* 모서리 둥글게 처리 */
}

.coupon-name {
  font-size: 15px; /* 쿠폰 이름 폰트 사이즈 변경 */
}

.coupon-price{
  font-size: 30px;
  margin-top: 10px;
  margin-left: 10px;
  color: #FFA500;
}

.receive-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 60px;
  background-color: #FFFFFF; /* 배경색 변경 */
  border: 1px solid #CCCCCC; /* 테두리 추가 */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 30px;
  width: 100%;
  margin-top: 5px;
}

.receive-button:hover {
  background-color: #e8e8e8; /* 버튼 호버 배경색 변경 */
}

.receive-button span {
  flex: 1;
}

.arrow.prev:hover {
  background-color: #e8e8e8;
}

.arrow.next:hover {
  background-color: #e8e8e8;
}
</style>
