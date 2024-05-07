<template>
  <div class="flex flex-col m-3">
    <div class="flex">
        <button @click="clickUser" class="button">
          고객
        </button>
      <button @click="clickComplaint" class="button">
        1:1문의
      </button>
    </div>
    <div class="w-full bg-white rounded-b-md h-full shadow-md">
        <UserDashBoardComponent v-if="page==1"/>
        <ComplaintDashBoardComponent v-if="page==2"/>
    </div>
  </div>
</template>

<script>
import UserDashBoardComponent from '@/components/UserDashBoardComponent.vue';
import ComplaintDashBoardComponent from '@/components/ComplaintDashBoardComponent.vue';
export default {
  components: {
    UserDashBoardComponent,
    ComplaintDashBoardComponent,
  },
  data() {
    return {
      page: '1',
    };
  },
  methods: {
    clickUser() {
      this.page = 1;
    },
    clickComplaint() {
      this.page = 2;
    }
  }
};
</script>

<style scoped>
.button {
  @apply 
  transition
  duration-300
  ease-in-out
  bg-orange-400
  hover:bg-orange-500 
  transform 
  hover:-translate-y-[2px]
  hover:scale-110
  mx-1 
  rounded-t-lg
  rounded-b-none
  text-white 
  font-semibold
  py-2
  px-4
  border-b
  border-orange-300
  w-[100px];
}
</style>
