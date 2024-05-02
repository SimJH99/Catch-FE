<template>
  <header class="bg-white pl-5 pr-12 py-2 text-base md:text-lg" v-if="showHeader">
    <div class="mx-auto flex justify-between">
      <div class="flex place-content-center items-center">
        <a href="/mypage">
          <img src="@/assets/logo1.png" class="h-auto w-[60px]" alt="로고" />
        </a>
      </div>
      <nav class="space-x-2 flex place-content-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-orange-400"  @click="openNotificationListModal">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" fill="currentColor" />
        </svg>
        <NotificationListModal :isModalNotificaitonOpen="isModalNotificaitonOpen" @close-modal="isModalNotificaitonOpen = false" class="absolute right-0 mt-6 mr-6" />
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
import NotificationListModal from '@/components/modal/NotificationListModal.vue';
  export default {
    components: {
      NotificationListModal,
    },
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
        userData: {}
      };
    },
    computed: {
      greetingMessage() {
        return `${this.userData.name}님 환영합니다.`;
      }
    },
    methods: {
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
    },
    created() {
      // 컴포넌트가 생성될 때 사용자 프로필 정보를 가져오도록 합니다.
      this.fetchUserProfile();
    }
  };
  </script>
  
  <style scoped>
  
  </style>