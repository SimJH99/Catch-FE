<template>
  <div>
    <div class="m-2 grid grid-cols-3">
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">미 답변 게시글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center">{{statusCount[0]}} 개</div>
      </div>
      
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">답변 완료 게시글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{statusCount[1]}} 개</div>
      </div>

      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">오늘 작성된 게시글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> 개</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      statusInfo: [],
      complaintStatus: [],
      statusCount: [],
    }
  },
  created(){
    this.fetchComplaint();
  },
  methods: {
    async fetchComplaint(){
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const statusRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countStatus`, { headers });
        this.statusInfo = statusRes.data.result.data;

        if(this.statusInfo.length == 1){
          this.complaintStatus.push(this.statusInfo[0][0]);
          this.statusCount.push(this.statusInfo[0][1]);
          this.complaintStatus.push('REPLY');
          this.statusCount.push(0);
        }else{
            for(var i = 0; i < this.statusInfo.length; i++){
            this.complaintStatus.push(this.statusInfo[i][0]);
            this.statusCount.push(this.statusInfo[i][1]);
          }
        }

      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>

</style>