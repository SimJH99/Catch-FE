<template>
  <div v-if="isModalNotificaitonOpen" class="modal" @click="closeNotificationListModal()">
    <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">미수신 알람</h2>
          <span class="close" @click="closeNotificationListModal()">&times;</span>
        </div>
        <div class="modal-body">
          <div v-if="notificationList.length === 0" class="empty-notification">
            미수신 알람이 없습니다.
          </div>
          <div v-else>
            <div v-for="notification in notificationList" :key="notification.id" class="notification-item" @click="sendPostRequest(notification.id)">
              <div class="notification-content">
                <h3 class="notificationTitle">{{ notification.notificationTitle }}</h3>
                <p>{{ notification.notificationContent }}</p>
              </div>
              <p class="time">{{ formatTime(notification.createdTime) }}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";

export default {
  props: ['isModalNotificaitonOpen'],
  data() {
    return {
      notificationList: [],
      isModalOpen: false,
    };
  },
  created() {
    this.loadNotifications();
  },
  methods: {
    async loadNotifications() {
      try {
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/notification/nonReceive`, { headers });
        this.notificationList = response.data.result.data;
      } catch (error) {
        console.log(error);
      }
    },
    closeNotificationListModal() {
      this.$emit('close-modal');
    },
    formatTime(time) {
      const createdTime = new Date(time);
      const currentTime = new Date();
      const timeDifference = currentTime - createdTime;

      // 시간 차이 계산
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      const daysDifference = Math.floor(hoursDifference / 24);

      // 시간 차이에 따라 텍스트 표시
      if (daysDifference > 0) {
        return `${daysDifference}일 전`;
      } else if (hoursDifference > 0) {
        return `${hoursDifference}시간 전`;
      } else if (minutesDifference > 0) {
        return `${minutesDifference}분 전`;
      } else {
        return '방금 전';
      }
    },
    async sendPostRequest(notificationId) {
      try {
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/notification/${notificationId}/notificationRead`, {}, { headers });
        // 요청이 성공하면 어떤 작업을 수행할 수 있습니다.
        this.notificationList = this.notificationList.filter(notification => notification.id !== notificationId);
        console.log(this.notificationList);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 160%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #F3F4F6;
  width: 500px;
  max-height: 85vh;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: sticky; /* 스크롤에 따라 고정되도록 설정 */
  top: 0; /* 상단에 고정되도록 설정 */
  z-index: 999; /* 다른 콘텐츠 위에 보이도록 설정 */
}

.modal-title {
  margin: 0;
  font-size: 30px;
  color: white;
}

.modal-body {
  padding: 20px;
  background-color: white;
  overflow-y: auto; /* 세로 스크롤 적용 */
}

button {
  margin-top: 10px;
  cursor: pointer;
}

.notificationTitle {
  font-size: 20px;
}

.notification-item {
  border: 1px solid #ccc; /* 회색 테두리 */
  padding: 15px;
  cursor: pointer; /* 커서를 포인터로 변경 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-item:hover {
  background-color: #f0f0f0; /* 마우스를 올렸을 때 배경색 변경 */
}

.notification-content {
  flex: 1; /* 남은 공간 모두 차지 */
}

/* 스크롤바 스타일 */
.modal-body::-webkit-scrollbar {
  width: 5px; /* 스크롤바 너비 */
}

.modal-body::-webkit-scrollbar-thumb {
  background-color: #888; /* 스크롤바 색상 */
  border-radius: 5px; /* 스크롤바 모서리 둥글게 */
}
</style>
