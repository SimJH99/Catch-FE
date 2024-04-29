<template>
  <div v-if="isEventModalOpen" class="modal">
    <div class="modal-content-large" @click.stop>
      <div class="modal-header">
        <h2 style="font-size: 24px; font-weight: bold; color:#EFEFEF">이벤트 상세 정보</h2>
        <span class="close" @click="closeDetailModal">&times;</span>
      </div>
      <div class="modal-body-large">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else>
          <div v-if="!isEditing">
            <div class="user-info">
              <div class="rounded-table">
                <div class="table-row">
                  <div class="table-label">제목</div>
                  <div class="table-value" style="width: 70%;">{{ accountDetails.name }}</div>
                </div>
                <div class="table-row">
                  <div class="table-label">시작일</div>
                  <div class="table-value">{{ accountDetails.startDate }}</div>
                </div>
                <div class="table-row">
                  <div class="table-label">종료일</div>
                  <div class="table-value">{{ accountDetails.endDate }}</div>
                </div>
              </div>
                <iframe :srcdoc="accountDetails.contents" class="preview"></iframe>
            </div>
            <div class="btn-container">
              <button @click="toggleEdit" class="btn">수정</button>
            </div>
          </div>
          <div v-else>
            <div class="mb-4">
              <label for="editName" class="block text-sm font-semibold text-gray-800 mb-1">이름</label>
              <input v-model="editName" type="text" id="editName" class="mt-1 p-2 w-full border rounded-md"
                placeholder="이름을 입력하세요">
            </div>
            <div class="mb-4">
              <label for="startDate" class="block text-sm font-semibold text-gray-800 mb-1">시작일</label>
              <input v-model="startDate" type="date" id="startDate" class="mt-1 p-2 w-full border rounded-md">
            </div>
            <div class="mb-4">
              <label for="endDate" class="block text-sm font-semibold text-gray-800 mb-1">종료일</label>
              <input v-model="endDate" type="date" id="endDate" class="mt-1 p-2 w-full border rounded-md">
            </div>
            <div class="mb-4">
              <label for="eventContent"  class="block text-sm font-semibold text-gray-800 mb-1">내용</label>
              <textarea v-model="eventContent" id="eventContent" class="mt-1 p-2 w-full border rounded-md" rows="12"
                placeholder="내용을 입력하세요"></textarea>
            </div>
            <div class="mb-4">
              <label for="preview" class="block text-sm font-semibold text-gray-800 mb-1">미리 보기</label>
              <iframe :srcdoc="eventContent" id="preview" class="fix_preview"></iframe>
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
import axios from "@/axios/index";

export default {
  props: ['selectedEventId', 'isEventModalOpen'],
  data() {
    return {
      accountDetails: {},
      loading: false,
      isEditing: false,
      editName: "",
      startDate: "",
      endDate: "",
      eventContent: "",
    };
  },
  watch: {
    selectedEventId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadAccountDetails(newVal);
        }
      }
    }
  },
  methods: {
    async loadAccountDetails(selectedEventId) {
      try {
        this.loading = true;
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/event/${selectedEventId}/detail`, { headers });
        this.accountDetails = response.data.result;
        this.editName = this.accountDetails.name;
        this.startDate = this.accountDetails.startDate;
        this.endDate = this.accountDetails.endDate;
        this.eventContent = this.accountDetails.contents;
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        this.loading = false;
      }
    },
    closeDetailModal() {
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
      try {
        // Perform save changes operation here
        this.isEditing = false;
        // You can emit an event to notify parent component about changes saved if needed
        this.$emit('changes-saved');
      } catch (error) {
        console.error("Error saving changes:", error);
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

.modal-content-large {
  width: 800px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 100vh;
  overflow-y: auto;
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

.modal-body-large {
  padding: 40px;
}

.rounded-table {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eae8e8;
  background-color: #f5f5f5;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  height: 40px;
}

.table-iframe {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  max-width: max-content;
  height: 350px;
}

.preview {
  margin-top: 10px;
  width: 100%;
  height: 300px;
}

.fix_preview{
  width: 100%;
  height: 300px; /* 수정: 내용 입력창의 높이에 따라 조정하세요 */
}

.table-label,
.table-value {
  padding: 12px;
}

.table-label {
  background-color: #efefef;
  color: black;
  font-weight: bold;
  flex: 1;
}

.table-value {
  flex: 3;
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
</style>
