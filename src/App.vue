<template>
  <div class="flex">
    <AppSideBar class="w-1/6"></AppSideBar>
    <router-view class="min-h-[800px] w-full"/>
  </div>
  <AppFooter v-if="isChecked" />

</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppSideBar from "@/components/AppSideBar.vue";
export default {
  data() {
    return {
      isChecked: true,
    }
  },
  
  components: {
    AppFooter,
    AppSideBar,
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