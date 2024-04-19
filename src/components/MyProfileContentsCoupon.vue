<template>
  <div class="mys_m_cpn">
      <h3>쿠폰</h3>
      <div class="my_m_wrap">
        <div class="my_m_cpn">
          <div class="flex items-center">
            <button @click="prevCoupon" class="arrow prev text-white bg-gray-500 rounded-full p-2">&larr;</button>
            <button @click="nextCoupon" class="arrow next text-white bg-gray-500 rounded-full p-2">&rarr;</button>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
        <div class="coupon-slider relative" ref="slider">
          <div class="slider-container relative overflow-hidden">
            <div class="coupons flex">
              <div v-for="(coupon, index) in coupons" :key="index" class="coupon relative" v-show="index >= currentIndex && index < currentIndex + 4">
                <div class="coupon-content">
                  <p>{{ coupon.name }}</p>
                  <button class="receive-button" @click="receiveCoupon(coupon)">수령</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        currentIndex: 0,
        coupons: [],
      };
    },
    created() {
      this.loadCoupons();
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
    if (this.currentIndex > 0) {
        this.currentIndex--;
    } else {
        // Wrap around to the last coupon
        this.currentIndex = this.coupons.length - 4;
    }
},
nextCoupon() {
    if (this.currentIndex < this.coupons.length - 4) {
        this.currentIndex++;
    } else {
        // Wrap around to the first coupon
        this.currentIndex = 0;
    }
},
      receiveCoupon(coupon) {
        // Implement logic to receive coupon
        return coupon;
      }
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

.mys_cont h3 {
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 500;
  line-height: 38px;
}

.my_m_wrap {
  overflow: hidden;
  width: 1016px;
}
  .coupon {
    width: 25%; /* 4개의 쿠폰을 가로로 정렬 */
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-right: 10px; /* 쿠폰 간격을 조정 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .receive-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .receive-button:hover {
    background-color: #45a049;
  }
  </style>
  