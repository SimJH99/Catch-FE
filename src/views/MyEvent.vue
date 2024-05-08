<template>
    <div>
      <div class="m-3 p-1 bg-yellow-gradient rounded-md shadow-md text-white text-center">
        <div class="text-4xl font-bold p-3"> 진행 중인 캠페인 </div>
      </div>
  
      <div v-if="eventList.length === 0" class="m-3 p-1 bg-white rounded-md shadow-md">
        <div style="min-height:700px" class="text-center2 p-2">진행 중인 캠페인이 없습니다.</div>
      </div>
  
      <div v-else class="m-3 p-1 bg-white rounded-md shadow-md">
        <div v-for="(events, index) in groupedEventList" :key="index">
          <div class="flex">
            <div class="w-1/2 p-2" v-for="event in events" :key="event">
              <iframe :srcdoc="event" class="preview"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from "@/axios/index";
  
  export default {
    data() {
      return {
        eventList: [],
        pageSize: 10,
        currentPage: 0,
        isLastPage: false,
        isLoading: false,
        totalPageCount: 0,
      };
    },
    created() {
      this.loadEvent();
    },
    computed: {
      groupedEventList() {
        const result = [];
        for (let i = 0; i < this.eventList.length; i += 2) {
          result.push([this.eventList[i], this.eventList[i + 1]]);
        }
        return result;
      },
    },
    methods: {
      async loadEvent() {
        try {
          const params = {
            page: this.currentPage,
            size: this.pageSize,
          };
          console.log("search 호출");
          const access_token = localStorage.getItem("access_token");
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/notification/eventList`, {
            headers,
            params,
          });
          console.log(response);
          this.eventList = response.data.result.data;
          console.log(this.eventList);
          this.totalPageCount = response.data.result.totalPages;
        } catch (error) {
          console.log(error);
        }
      },
      changePage(pageNum) {
        this.currentPage = pageNum;
        this.loadEvent();
      },
      changePageSize(event) {
        this.pageSize = parseInt(event.target.value);
        this.loadEvent();
      },
    },
  };
  </script>
  
  <style scoped>
  .preview-container {
    border-left: 1px solid #ccc;
  }
  
  .preview {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    height: 500px;
    overflow-y: auto;
  }
  
  .bg-yellow-gradient {
    background: linear-gradient(45deg, rgb(251 146 60), #FDD4A0);
    min-height: 85px;
    margin-bottom: -10px;
  }
  .text-4xl{
    font-size: 2.25rem;
    line-height: 3rem;
    color: white;
  }
  .text-center2{
    font-size: 25px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 700px;
  }
  </style>
  