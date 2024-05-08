<template>
  <div v-if="isModalMyCouponListOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="text-white text-4xl">내 쿠폰</h2>
        <span class="close" @click="closeMyCouponListModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else class="table-container">
          <table class="divide-y divide-gray-200" style="width: 100%;" >
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 33%;">
                          쿠폰명
                      </th>
                      <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 33%;">
                          시작일
                      </th>
                      <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style="width: 34%;">
                          마감일
                      </th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" >
                  <tr v-for="coupon in couponList" :key="coupon.id">
                      <td class="px-5 py-3 whitespace-nowrap" style="max-width: 33%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ truncateText(coupon.name, 10) }}</td>
                      <td class="px-5 py-3 whitespace-nowrap" style="max-width: 33%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{coupon.startDate}}</td>
                      <td class="px-5 py-3 whitespace-nowrap" style="max-width: 34%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{coupon.endDate}}</td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
      <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" />
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  components: {
      PaginationComponent,
  },
  props: ['isModalMyCouponListOpen'],
  data() {
    return {
      couponList: [],
      loading: false,
      isEditing: false,

      pageSize: 5,
      currentPage: 0,
      searchValue: '',
      isLastPage: false,
      isLoading: false,
      totalPageCount: 0,
    };
  },
  created(){
      this.loadMyCoupons();
  },
  methods: {
    async loadMyCoupons() {
      try{
          // this.loading = true;
          const params = {
              page: this.currentPage,
              size: this.pageSize,
          }
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/myList`, { headers, params });
          this.couponList = response.data.result.data;
          this.totalPageCount = response.data.result.totalPage;
          console.log(response);
          console.log(this.totalPageCount);
      }catch(error){
          console.log(error);
      }
    },
    closeMyCouponListModal() {
      this.isEditing = false; // 수정 상태를 해제
      this.$emit('close-modal');
    },
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    changePage(pageNum) {
      this.currentPage = pageNum;
      this.loadMyCoupons();
    },
    changePageSize(event) {
        this.pageSize = parseInt(event.target.value);
        this.loadMyCoupons();
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text;
      }
    },
  }
};
</script>

<style scoped>
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 600px; /* 수정된 부분: 넓이를 더 크게 조정 */
  height: 450px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}


.close {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 24px;
  color: white;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

.btn {
  cursor: pointer;
  background-color: #f5a742;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 10px;
}

.btn:hover {
  background-color: #e69500;
}

p {
  margin: 10px 0;
  font-weight: bold;
}

.btn-container {
  text-align: right;
}
.table-container {
  width: 550px; /* 테이블의 원하는 고정 너비로 설정 */
  max-height: 400px; /* 필요에 따라 최대 높이 설정 */
}
</style>
