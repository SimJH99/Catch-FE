<template>
  <div v-if="isModalAdminDetailOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>계정 상세 정보</h2>
        <span class="close" @click="closeAdminDetailModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else>
          <div v-if="!isEditing">
            <p><strong>이름:</strong> {{ accountDetails.name }}</p>
            <p><strong>사원번호:</strong> {{ accountDetails.employeeNumber }}</p>
            <p><strong>이메일:</strong> {{ accountDetails.email }}</p>
            <p><strong>권한:</strong> {{ formatRole(accountDetails.role) }}</p>
            <p><strong>상태:</strong> {{ formatActive(accountDetails.active) }}</p>
            <div class="btn-container">
              <button @click="toggleEdit" class="btn">수정</button>
              <button v-if="accountDetails.active" @click="disabledAdmin" class="btn">계정 비활성화</button>
              <button v-else @click="activationAdmin" class="btn">계정 활성화</button>
            </div>
          </div>
          <div v-else>
            <div class="mb-4">
              <label for="editName" class="block text-sm font-semibold text-gray-800 mb-1">이름</label>
              <input v-model="editName" type="text" id="editName" class="mt-1 p-2 w-full border rounded-md"
                placeholder="이름을 입력하세요">
            </div>
            <label for="editEmail" class="block text-sm font-semibold text-gray-800 mb-1"
              style="margin-right: 10px;">이메일 주소</label>
            <div class="mb-4" style="display: flex; align-items: center;">
              <input v-model="editEmail" type="email" id="editEmail" class="mt-1 p-2 flex-1 border rounded-md"
                placeholder="이메일을 입력하세요">
              <button :disabled="isEmailNotUsed" type="button" @click.prevent="checkEmail"
                :class="{ 'bg-gray-400': !isValidEmail, 'bg-f5a742': isValidEmail }"
                style="background-color: #f5a742; color: white; border: none; padding: 8px 16px;"
                class="ml-2 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray">
                {{ isEmailNotUsed ? '사용 가능' : '중복 체크' }}
              </button>
            </div>
            <div class="mb-4">
              <label for="editRole" class="block text-sm font-semibold text-gray-800 mb-1">권한(역할)</label>
              <select id="editRole" v-model="editRole" class="mt-1 p-2 w-full border rounded-md">
                <option value="MARKETER">마케터</option>
                <option value="CS">CS 담당자</option>
              </select>
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
  props: ['selectedAdminId', 'isModalAdminDetailOpen'],
  data() {
    return {
      accountDetails: {},
      loading: false,
      isEditing: false,
      editName: "",
      editEmail: "",
      editRole: "",
      isEmailNotUsed: false,
      isEmailChecking: false,
      emailValidMessage: "",
    };
  },
  computed: {
    isValidEmail() {
      return this.editEmail.includes('@') && this.editEmail.includes('.');
    }
  },
  watch: {
    selectedAdminId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadAccountDetails(newVal);
        }
      }
    }
  },
  methods: {
    async loadAccountDetails(selectedAdminId) {
      try {
        this.loading = true;
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/admin/${selectedAdminId}/detail`, { headers });
        this.accountDetails = response.data.result;
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        this.loading = false;
      }
    },
    closeAdminDetailModal() {
      this.isEditing = false; // 수정 상태를 해제
      this.$emit('close-modal');
    },
    formatRole(role) {
      switch (role) {
        case "MARKETER":
          return "마케터";
        case "CS":
          return "CS 담당자";
        default:
          return role;
      }
    },
    formatActive(active) {
      return active ? "활성화" : "비활성화";
    },
    toggleEdit() {
      this.isEditing = true;
      this.editName = this.accountDetails.name;
      this.editEmail = this.accountDetails.email;
      this.editRole = this.accountDetails.role;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    async saveChanges() {
      if (confirm("계정을 수정 하시겠습니까?")) {
        try {
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          const data = {
            name: this.editName,
            email: this.editEmail,
            role: this.editRole
          };
          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/admin/${this.selectedAdminId}/update`, data, { headers });
          this.isEditing = false;
          this.loadAccountDetails(this.selectedAdminId);
          alert("수정이 완료 되었습니다.")
        } catch (error) {
          console.error("Error saving changes:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    },
    async disabledAdmin() {
      if (confirm("계정을 비활성화 하시겠습니까?")) {
        try {
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/admin/${this.selectedAdminId}/disabled`, {}, { headers });
          alert("계정이 비활성화 되었습니다.");
          this.loadAccountDetails(this.selectedAdminId);
        } catch (error) {
          console.error("Error deleting admin:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    },
    async activationAdmin() {
      if (confirm("계정을 활성화 하시겠습니까?")) {
        try {
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/admin/${this.selectedAdminId}/activation`, {}, { headers });
          alert("계정이 활성화 되었습니다.");
          this.loadAccountDetails(this.selectedAdminId);
        } catch (error) {
          console.error("Error enabling admin:", error);
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    },
    async checkEmail() {
      try {
        if (!this.editEmail || !this.isValidEmail) {
          window.alert("올바른 이메일 주소를 입력하세요.");
          return;
        }
        this.isEmailChecking = true;
        const access_token = localStorage.getItem("access_token");
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/emailCheck`, { email: this.editEmail }, { headers });

        if (response.data.result.code === 'EXISTING_EMAIL') {
          this.isEmailNotUsed = false;
          this.emailValidMessage = response.data.result.label;
          window.alert(this.emailValidMessage);
        } else {
          this.isEmailNotUsed = true;
          window.alert("사용 가능한 이메일 입니다.");
        }

        // isFormValid를 재계산
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isEmailChecking = false;
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
  width: 400px;
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
</style>
