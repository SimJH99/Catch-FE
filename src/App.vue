<template>
  <div>
    <div class="flex md:flex-row flex-col bg-gray-100">
      <AppSideBar
        v-if="isChecked && !isLoginPage"
        class="min-w-[250px] w-1/6 h-screen"
      ></AppSideBar>
      <div class="w-full">
        <AppHeader v-if="showHeader" class="w-full"></AppHeader>
        <router-view class="min-h-[800px]" />
      </div>
    </div>
    <AppFooter v-if="isChecked && !isLoginPage" class="w-full"></AppFooter>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppSideBar from "@/components/AppSideBar.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  data() {
    return {
      isChecked: true,
      isLoginPage: false,
    };
  },

  components: {
    AppFooter,
    AppSideBar,
    AppHeader,
  },

  computed: {
    showHeader() {
      // 헤더가 표시되어야 하는지 여부 확인
      return this.isChecked && !this.isLoginPage;
    },
  },

  mounted() {
    // 로컬 스토리지에서 access_token 가져오기
    const accessToken = localStorage.getItem("access_token");

    // access_token이 없는 경우 (로그인 되어 있지 않은 경우)
    if (!accessToken) {
      this.isChecked = false;
      this.isLoginPage = true;
    }
  },
};
</script>

<style>
</style>
