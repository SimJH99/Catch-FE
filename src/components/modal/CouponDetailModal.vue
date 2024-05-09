<template>
  <div v-if="isModalCouponDetailOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 style="font-size: 24px; font-weight: bold; color:#EFEFEF">쿠폰 상세 정보</h2>
        <span class="close" @click="closeCouponDetailModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else>
          <div v-if="!isEditing">
            <div class="user-info">
              <div class="rounded-table">
                <div class="table-row">
                  <div class="table-label">쿠폰명</div>
                  <div class="table-value" style="width: 70%;">{{ couponDetails.name }}</div>
                </div>
                <div class="table-row">
                  <div class="table-label">수량</div>
                  <div class="table-value" style="width: 70%;">{{ couponDetails.quantity }}</div>
                </div>
                <div class="table-row">
                  <div class="table-label">시작일</div>
                  <div class="table-value">{{ couponDetails.startDate }}</div>
                </div>
                <div class="table-row">
                  <div class="table-label">종료일</div>
                  <div class="table-value">{{ couponDetails.endDate }}</div>
                </div>
              </div>

            </div>
            <div class="btn-container">
              <button @click="toggleEdit" class="btn">수정</button>
            </div>
          </div>
          <div v-else>
            <div class="mb-4">
              <label for="editName" class="block text-sm font-semibold text-gray-800 mb-1">쿠폰명</label>
              <input v-model="editName" type="text" id="editName" class="mt-1 p-2 w-full border rounded-md"
                placeholder="이름을 입력하세요">
            </div>
            <div class="mb-4">
              <label for="editQuantity" class="block text-sm font-semibold text-gray-800 mb-1">쿠폰 수량</label>
              <input v-model="editQuantity" type="number" id="editQuantity" class="mt-1 p-2 w-full border rounded-md"
                placeholder="수량을 입력하세요" min="1" max="1000000000">
            </div>
            <div class="mb-4">
              <label for="editPrice" class="block text-sm font-semibold text-gray-800 mb-1">쿠폰 가격</label>
              <input v-model="editPrice" type="number" id="editPrice" class="mt-1 p-2 w-full border rounded-md"
                placeholder="가격을 입력하세요" min="1" max="10000000000">
            </div>
            <div class="mb-4">
              <label for="endDate" class="block text-sm font-semibold text-gray-800 mb-1">종료일</label>
              <input v-model="endDate" type="date" id="endDate" class="mt-1 p-2 w-full border rounded-md">
            </div>
            <div class="btn-container">
              <button @click="saveChanges" class="btn">저장</button>
              <button @click="cancelEdit" class="btn">취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['selectedCouponDetailsId', 'isModalCouponDetailOpen'],
  data() {
    return {
      couponDetails: {},
      loading: false,
      isEditing: false,
      editName: "",
      editQuantity: "",
      startDate: "",
      endDate: "",

    };
  },
  computed: {
    // 계산된 속성 생략
  },
  watch: {
    selectedCouponDetailsId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadCouponDetails(newVal);
        }
      }
    }
  },
  methods: {
    async loadCouponDetails(selectedCouponDetailsId) {
      try {
        console.log(selectedCouponDetailsId);
        this.loading = true;
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/${selectedCouponDetailsId}`, { headers });
        this.couponDetails = response.data.result.data;
        this.editName = this.couponDetails.name;
        this.startDate = this.couponDetails.startDate;
        this.endDate = this.couponDetails.endDate;
        this.editQuantity = this.couponDetails.quantity;
      } catch (error) {
        console.error("Error fetching coupon details:", error);
      } finally {
        this.loading = false;
      }
    },
    closeCouponDetailModal() {
      this.isEditing = false;
      this.$emit('close-modal');
    },
    toggleEdit() {
      this.isEditing = true;

    },
    cancelEdit() {
      this.isEditing = false;
    },
    async saveChanges() {
      if (confirm("쿠폰을 수정 하시겠습니까?")) {
        try {
          if (!this.editName) {
            alert("쿠폰명을 입력하세요.");
          } else if (this.editQuantity < 1 || this.editQuantity > 1000000000) {
            alert("수량은 1에서 1000000000 사이의 값을 입력하세요.");
          } else if (!this.startDate) {
            alert("쿠폰 시작일을 선택하세요.");
          } else if (!this.endDate) {
            alert("쿠폰 종료일을 입력하세요.");
          } else {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 1);

            // 시작일이 현재 날짜 이전인지 검사
            if (new Date(this.startDate) < currentDate) {
              alert('시작일은 현재 날짜 이후여야 합니다.');
              return;
            }
            // 종료일이 현재 날짜 이전인지 검사
            if (new Date(this.endDate) < currentDate) {
              alert('종료일은 현재 날짜 이후여야 합니다.');
              return;
            }
            // 시작일이 종료일보다 이른지 검사
            if (new Date(this.startDate) > new Date(this.endDate)) {
              alert('시작일은 종료일보다 이전이어야 합니다.');
              return;
            }

            const access_token = localStorage.getItem('access_token');
            const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
            const data = {
              name: this.editName,
              startDate: this.startDate,
              endDate: this.endDate,
              quantity: this.editQuantity
            };
            console.log(data);
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${this.selectedCouponDetailsId}/update`, data, { headers });
            this.isEditing = false;
            alert("수정이 완료 되었습니다.");
            this.closeCouponDetailModal();
            window.location.href = "/couponList";
          }
        } catch (error) {
          this.editName = this.couponDetails.name;
          this.startDate = this.couponDetails.startDate;
          this.endDate = this.couponDetails.endDate;
          this.editQuantity = this.couponDetails.quantity;
          console.error("Error saving changes:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
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
  width: 500px;
  border-radius: 8px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  /* 세로 스크롤 활성화 */
}

.close {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 24px;
  color: #000000;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
}

.modal-body {
  padding: 20px;
}

.rounded-table {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eae8e8;
  /* 테두리 색상 설정 */
  background-color: #f5f5f5;
  /* 연한 회색으로 변경 */
}

.table-row {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  /* 연한 회색 */
  height: 40px;
  /* 로우의 높이를 설정합니다. */
}

.table-label,
.table-value {
  padding: 12px;
}

.table-label {
  background-color: #efefef;
  /* 연한 회색 */
  color: black;
  /* 검정색 */
  font-weight: bold;
  flex: 1;
  /* 너비 조정 */
}

.table-value {
  flex: 3;
  /* 너비 조정 */
}

.btn-container {
  text-align: right;
}

.btn {
  cursor: pointer;
  background-color: #f5a742;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 10px;
  margin-left: 10px;
}

.btn:hover {
  background-color: #e69500;
}

.editable {
  background-color: #d1ecf1;
  /* 수정 가능한 부분을 강조하는 색상 */
}

.memo-info {
  margin-top: 20px;
}

.memo-info .rounded-table {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eae8e8;
  background-color: #ffffff;
  height: 300px;
  /* 원하는 높이로 설정 */
  max-height: 100%;
  /* 최대 높이 설정 */
}

.memo-info .table-row {
  border-bottom: none;
  /* 중간 선 제거 */
}

.table-row {
  display: flex;
  background-color: #ffffff;
  height: 40px;
}

.memo-info .table-value {
  padding: 12px;
  font-size: 16px;
  white-space: pre-line;
  /* 수정 */
}
</style>
