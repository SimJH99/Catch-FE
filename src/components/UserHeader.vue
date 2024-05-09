<template>
  <header class="bg-white pl-5 pr-12 py-2 text-base md:text-lg" v-if="showHeader">
    <div class="mx-auto flex justify-between">
      <div class="flex place-content-center items-center">
        <a href="/mypage">
          <img src="@/assets/logo1.png" class="h-auto w-[60px]" alt="로고" />
        </a>
      </div>
      <nav class="space-x-2 flex place-content-center items-center">
        <svg v-if="notificationList.length > 0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-orange-400" @click="toggleNotificationList">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" fill="currentColor" />
        </svg>
        <!-- 리스트가 비어있으면 fill 속성을 비워줍니다. -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill=white viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-orange-400" @click="toggleNotificationList">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        <transition name="fade">
          <div v-if="isNotificationListOpen" class="notification-list">
            <div class="body">
              <div v-if="notificationList.length === 0" class="empty-notification">
                미수신 알람이 없습니다.
              </div>
              <div v-else>
                <div v-for="notification in notificationList" :key="notification.id" class="notification-item" @click="readNotification(notification.id)">
                  <div class="notification-content">
                    <h3 class="notificationTitle">{{ notification.notificationTitle }}</h3>
                    <p> 지금 당장 이메일을 확인하세요!</p>
                  </div>
                  <p class="time">{{ formatTime(notification.createdTime) }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <template v-if="userLoggedIn">
          <span class="text-gray-700 mr-2" style="font-size: 1.2rem;">
            {{ greetingMessage }}
          </span>
        </template>
        <button v-if="userLoggedIn" @click="logout"
          style="background-color: #f5a742; color: white; border: none; font-size: 0.9rem;"
          class="px-3 py-1 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray">
          로그아웃
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import axios from "@/axios/index";
// import NotificationListModal from '@/components/modal/NotificationListModal.vue';
  export default {
    props: {
      showHeader: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        userLoggedIn: false,
        isModalNotificaitonOpen: false,
        notificationList: [],
        userData: {},
        isNotificationListOpen: false,
      };
    },
    computed: {
      greetingMessage() {
        return `${this.userData.name}님 환영합니다.`;
      },
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
      async fetchUserProfile() {
        try {
          const access_token = localStorage.getItem("access_token");
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/profile`, { headers });
          if (response.status === 200 && response.data.httpStatus === 'OK') {
            this.userLoggedIn = true;
            this.userData = response.data.result;
          } else {
            // 로그인 정보를 가져오는 데 실패했을 때의 처리
            console.error('Failed to fetch user profile data.');
          }
        } catch (error) {
          console.error('An error occurred while fetching user profile data:', error);
        }
      },
      async logout() {
            try {
          const access_token = localStorage.getItem("access_token");
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/doLogout`, {}, { headers });
          if (response.status === 200 && response.data.httpStatus === 'OK') {
            // 로그아웃이 성공한 경우 로컬 스토리지 등에서 사용자 정보를 지웁니다.
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("pushToken");
            this.userLoggedIn = false;
            // 로그아웃 성공 메시지 등을 처리할 수 있습니다.
            window.location.href = "/";
          } else {
            console.error('Failed to logout:', response.data.message);
          }
        } catch (error) {
          console.error('An error occurred while logging out:', error);
        }
      },
      openNotificationListModal() {
          this.isModalNotificaitonOpen = true;
          console.log("List에서 클릭하면 열리는지 여부: ",this.isModalNotificaitonOpen);
      },
      closeNotificationListModal() {
          this.isModalNotificaitonOpen = false;
          console.log(this.isModalNotificaitonOpen);
      },
      toggleNotificationList() {
        this.isNotificationListOpen = !this.isNotificationListOpen;
        console.log(this.isNotificationListOpen)
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
    async readNotification(notificationId) {
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
    },
    created() {
      // 컴포넌트가 생성될 때 사용자 프로필 정보를 가져오도록 합니다.
      this.fetchUserProfile();
      this.loadNotifications()
    }
  };
  </script>
  
  <style scoped>
  .notification-list {
    position: absolute;
    right: 100px;
    top: 65px;
    width: 400px;
    height: 300px;
    margin-top: 6px;
    margin-right: 6px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px; /* 테두리를 둥글게 만듭니다. */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    overflow-y: auto; 
    z-index: 999; /* 다른 콘텐츠 위에 보이도록 설정 */
}

  /* 스크롤바 스타일 */
.notification-list::-webkit-scrollbar {
  width: 5px; /* 스크롤바 너비 */
}

.notification-list::-webkit-scrollbar-thumb {
  background-color: #888; /* 스크롤바 색상 */
  border-radius: 5px; /* 스크롤바 모서리 둥글게 */
}
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
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

  .notificationTitle {
    font-size: 15px;
    font-weight: bold; /* 글자를 더 굵게 만듭니다. */
}
.empty-notification{
  font-size: 15px;
  text-align: center;
  margin-top: 35%;
}

  </style>

