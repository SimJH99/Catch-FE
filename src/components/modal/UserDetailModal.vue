<template>
  <div v-if="isModalUserDetailOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 style="font-size: 24px; font-weight: bold; color:#EFEFEF">계정 상세 정보</h2>
        <span class="close" @click="closeUserDetailModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading" class="loading-text">
          로딩 중...
        </div>
        <div v-else>
          <!-- 기본 정보 -->
          <div class="user-info">
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">기본정보</h3>
            <div class="rounded-table">
              <!-- 이름 -->
              <div class="table-row">
                <div class="table-label">이름</div>
                <div class="table-value" style="width: 70%;">{{ accountDetails.name }}</div>
              </div>
              <!-- 생년월일 -->
              <div class="table-row">
                <div class="table-label">생년월일</div>
                <div class="table-value">{{ accountDetails.birthDate }}</div>
              </div>
              <!-- 성별 -->
              <div class="table-row">
                <div class="table-label">성별</div>
                <div class="table-value">{{ formatGender(accountDetails.gender) }}</div>
              </div>
              <!-- 등급 -->
              <div class="table-row">
                <div class="table-label">등급</div>
                <div v-if="isEditing" class="table-value">
                  <select  v-model="grade" class="outline-none">
                    <option>VVIP</option>
                    <option>VIP</option>
                    <option>GOLD</option>
                    <option>SILVER</option>
                  </select>
                </div>
                <div v-else class="table-value">{{ accountDetails.grade }}</div>
              </div>
              <!-- 마케팅 수신 여부 -->
              <div class="table-row">
                <div class="table-label">마케팅 수신 여부</div>
                <div class="table-value">{{ formatMarketing(accountDetails.consentReceiveMarketing) }}</div>
              </div>
              <!-- 활성화 상태 -->
              <div class="table-row">
                <div class="table-label">활성화 상태</div>
                <div class="table-value">{{ formatActive(accountDetails.active) }}</div>
              </div>
            </div>
          </div>
          <!-- 연락처 정보 -->
          <div class="contact-info">
            <h3 style="font-size: 20px; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">연락처 정보</h3>
            <div class="rounded-table" style="background-color: #EFEFEF;">
              <!-- 이메일 -->
              <div class="table-row">
                <div class="table-label">이메일</div>
                <div class="table-value">{{ accountDetails.email }} </div>
              </div>
              <!-- 전화번호 -->
              <div class="table-row">
                <div class="table-label">전화번호</div>
                <div class="table-value">{{ accountDetails.phoneNumber }} </div>
              </div>
            </div>
          </div>
          <!-- 주소 -->
          <div class="address-info">
            <h3 style="font-size: 20px; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">주소</h3>
            <div class="rounded-table" style="background-color: #EFEFEF;">
              <!-- 주소 -->
              <div class="table-row">
                <div class="table-label">주소</div>
                <div class="table-value"> {{ accountDetails.address }} </div>
              </div>
              <!-- 상세 주소 -->
              <div class="table-row">
                <div class="table-label">상세 주소</div>
                <div class="table-value"> {{ accountDetails.detailAddress }} </div>
              </div>
              <!-- 우편번호 -->
              <div class="table-row">
                <div class="table-label">우편번호</div>
                <div class="table-value"> {{ accountDetails.zipcode }} </div>
              </div>
            </div>
          </div>
          <!-- 메모 -->
          <div class="memo-info">
            <h3 style="font-size: 20px; font-weight: bold; margin-top: 5px; margin-bottom: 5px;">메모</h3>
            <div class="rounded-table">
              <div class="table-row">
                <div class="table-value" style="width: 100%;">
                  <textarea class="w-full outline-none" v-if="isEditing" v-model="userNotice" rows="14" cols="30"></textarea>
                  <span v-else v-html="accountDetails.userNotice"></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 버튼 -->
          <div class="btn-container">
            <button v-if="!isEditing" @click="toggleEdit" class="btn">수정</button>
            <button v-if="isEditing" @click="saveChanges" class="btn">저장</button>
            <button v-if="isEditing" @click="cancelEdit" class="btn">취소</button>
            <button v-if="accountDetails.active" @click="disabled" class="btn disable-button">계정 비활성화</button>
            <button v-else @click="activation" class="btn activate-button">계정 활성화</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";

export default {
  props: ['selectedUserId', 'isModalUserDetailOpen'],
  data() {
    return {
      accountDetails: {},
      loading: false,
      isEditing: false,
      userNotice: "",
      grade: ""
    };
  },
  computed: {
    // 계산된 속성 생략
  },
  watch: {
    selectedUserId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadAccountDetails(newVal);
        }
      }
    }
  },
  methods: {
    async loadAccountDetails(selectedUserId) {
      try {
        this.loading = true;
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/${selectedUserId}/detail`, { headers });
        this.accountDetails = response.data.result;
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        this.loading = false;
      }
    },
    closeUserDetailModal() {
      this.isEditing = false;
      this.$emit('close-modal');
    },
    formatActive(active) {
      return active ? "활성화" : "비활성화";
    },
    formatMarketing(consentReceiveMarketing) {
      return consentReceiveMarketing ? "동의" : "비동의";
    },
    toggleEdit() {
      this.isEditing = true;
      this.userNotice = this.accountDetails.userNotice;
      this.grade = this.accountDetails.grade;

      // 계정 비활성화/활성화 버튼 숨기기
      const disableButton = document.querySelector('.disable-button');
      const activateButton = document.querySelector('.activate-button');
      if (disableButton) disableButton.style.display = 'none';
      if (activateButton) activateButton.style.display = 'none';

    },
    cancelEdit() {
      this.isEditing = false;
      // 메모도 원래 값으로 되돌리기
      this.userNotice = this.accountDetails.userNotice;
      this.grade = this.accountDetails.grade;

      // 계정 비활성화/활성화 버튼 다시 보이기
      const disableButton = document.querySelector('.disable-button');
      const activateButton = document.querySelector('.activate-button');
      if (disableButton) disableButton.style.display = 'inline-block';
      if (activateButton) activateButton.style.display = 'inline-block';
    },
    async saveChanges() {
      if (confirm("계정을 수정 하시겠습니까?")) {
        try {
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          const data = {
            userNotice: this.userNotice, // 메모도 업데이트
            grade: this.grade
          };

          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/user/${this.selectedUserId}/update`, data, { headers });
          this.isEditing = false;
          this.loadAccountDetails(this.selectedUserId);
          alert("수정이 완료 되었습니다.")
          window.location.reload();
        } catch (error) {
          console.error("Error saving changes:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    },
    async disabled() {
      if (confirm("계정을 비활성화 하시겠습니까?")) {
        try {
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/user/${this.selectedUserId}/disabled`, {}, { headers });
          alert("계정이 비활성화 되었습니다.");
          this.loadAccountDetails(this.selectedUserId);
        } catch (error) {
          console.error("Error deleting admin:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    },
    async activation() {
      if (confirm("계정을 활성화 하시겠습니까?")) {
        try {
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/user/${this.selectedUserId}/activation`, {}, { headers });
          alert("계정이 활성화 되었습니다.");
          this.loadAccountDetails(this.selectedUserId);
        } catch (error) {
          console.error("Error enabling admin:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    },
    formatGender(gender) {
      switch (gender) {
        case "MALE":
          return "남성";
        case "FEMALE":
          return "여성";
        default:
          return gender;
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
  overflow-y: auto; /* 세로 스크롤 활성화 */
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
  height: 300px; /* 원하는 높이로 설정 */
  max-height: 100%; /* 최대 높이 설정 */
}

.memo-info .table-row {
  border-bottom: none; /* 중간 선 제거 */
}
.table-row {
  display: flex;
  background-color: #ffffff;
  height: 40px;
}

.memo-info .table-value {
  padding: 12px;
  font-size: 16px;
  white-space: pre-line; /* 수정 */
}



</style>
