<template>
  <header class="bg-white pl-5 pr-12 py-2 text-base md:text-lg" v-if="showHeader">
    <div class="mx-auto flex justify-between">
      <div class="flex place-content-center items-center">
        <a href="/dashBoard">
          <img src="@/assets/logo2.png" class="h-[60px] w-[60px]" alt="로고" />
        </a>
      </div>
      <nav class="space-x-2 flex place-content-center items-center">
        <template v-if="userLoggedIn">
          <span class="text-gray-700 mr-2">
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
      userData: {}
    };
  },
  computed: {
    greetingMessage() {
      return `${this.userData.name}님 환영합니다.`;
    }
  },
  methods: {
    async fetchAdminProfile() {
      try {
        const access_token = localStorage.getItem("access_token");
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/admin/profile`, { headers });
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
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/doLogout`, {}, { headers });
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
        if (error.response && error.response.status === 409) {
          // 409 오류는 충돌이 발생했음을 나타냅니다.
          // 이 경우, 사용자에게 적절한 메시지를 표시하고 다른 대응을 취할 수 있습니다.
          console.error('Conflict occurred during logout. Please refresh the page or try again later.');
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          this.userLoggedIn = false;
          // 로그아웃 성공 메시지 등을 처리할 수 있습니다.
          window.location.href = "/";
        } else {
          console.error('An error occurred while logging out:', error);
        }
      }
    }
  },
  created() {
    // 컴포넌트가 생성될 때 사용자 프로필 정보를 가져오도록 합니다.
    this.fetchAdminProfile();
  }
};
</script>

<style scoped></style>