<!-- App.vue -->

<template>
  <div>
    <div class="bg-gray-100">
      <component :is="headerComponent"></component>
      <div class="flex w-auto">
        <AppSideBar v-if="showSideBar" class="min-w-[250px] w-1/6 h-auto"></AppSideBar>
        <router-view class="w-full min-h-[800px]"/>
      </div>
    </div>
    <component :is="footerComponent"></component>
  </div>
</template>

<script>
import AppSideBar from "@/components/AppSideBar.vue";
import UserHeader from "@/components/UserHeader.vue"
import UserFooter from "./components/UserFooter.vue";
import AdminHeader from "./components/AdminHeader.vue";
import AdminFooter from "./components/AdminFooter.vue";

export default {
  data() {
    return {
      headerComponent: null,
      footerComponent: null,
      showSideBar: false
    };
  },
  components: {
    AppSideBar,
    UserHeader,
    UserFooter,
    AdminHeader,
    AdminFooter
  },
  watch: {
    $route(to) {
      this.updateLayout(to);
    }
  },
  mounted() {
    this.updateLayout(this.$route);
  },
  methods: {
    updateLayout(route) {
      const meta = route.meta || {};
      const hideHeaderFooter = meta.hideHeaderFooter || false;
      
      if (hideHeaderFooter) {
        this.headerComponent = null; // 헤더 숨기기
        this.footerComponent = null; // 푸터 숨기기
        this.showSideBar = false; // 사이드바 숨기기
      } else {
        // 헤더, 푸터, 사이드바를 역할에 따라 설정
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const [, payloadBase64] = accessToken.split('.');
          const payload = JSON.parse(atob(payloadBase64));
          const userRole = payload.sub.split(':')[1];
          if (userRole === 'ADMIN' || userRole === 'CS' || userRole ==='MARKETER') {
            this.headerComponent = 'AdminHeader';
            this.footerComponent = 'AdminFooter';
            this.showSideBar = true;
          } else {
            this.headerComponent = 'UserHeader';
            this.footerComponent = 'UserFooter';
          }
        }
      }
    }
  }
};
</script>

<style>
</style>
