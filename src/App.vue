<template>
  <div class="flex md:flex-row flex-col bg-gray-100">
    <AppSideBar class="min-w-[250px] w-1/6 h-screen"></AppSideBar>
    <div class="w-full">
      <AppHeader></AppHeader>
      <router-view class="min-h-[800px]"/>
    </div>
  </div>
  <AppFooter class="w-full"></AppFooter>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppSideBar from "@/components/AppSideBar.vue";
import AppHeader from "@/components/AppHeader.vue"

export default {
  data() {
    return {
      isChecked: true,
    }
  },
  
  components: {
    AppFooter,
    AppSideBar,
    AppHeader,
  },

  created(){
    if(document.location.pathname === '/login'){
      this.isChecked = false;
    }
  }
}
</script>

<style>

</style>