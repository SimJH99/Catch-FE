<template>
    <div class="bg-white m-3 ">
      <div class="text-4xl mb-6 font-bold">나의 문의 내역</div>
      <div class="container">
        <table class="divide-y divide-gray-200 w-full">
          <thead>
            <tr class="divide-y divide-green-200 border-t-2 border-b-2 border-black">
                    <th scope="col" class="px-6 py-3 w-1/6 text-center text-xl font-medium text-black uppercase tracking-wider">No</th>
                    <th scope="col" class="px-6 py-3 w-3/6 text-center text-xl font-medium text-black uppercase tracking-wider">제목</th>
                    <th scope="col" class="px-6 py-3 w-1/6 text-center text-xl font-medium text-black uppercase tracking-wider">작성 시간</th>
                    <th scope="col" class="px-6 py-3 w-1/6 text-center text-xl font-medium text-black uppercase tracking-wider">답변 상태</th>
                  </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 cursor-pointer">
              <tr v-for="(account)  in displayedAccounts" :key="account.id" @click="ComplaintDetail(account.id)">
                <td :class="getStatusBackground(account.status)">{{ account.id }}</td>
                <td :class="getStatusBackground(account.status)" class="text-left">{{ account.title }}</td>
                <td :class="getStatusBackground(account.status)">{{ account.createdTime }}</td>
                <td :class="getStatusColor(account.status)">
                  {{ account.status }}
                </td>
              </tr>          
            </tbody>
          </table>
          <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" class="m-4"/>
          <div class="absolute bottom-auto right-0">
            <button class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded" @click="createComplaint">문의 하기</button>
          </div>
    </div>
</div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';
import router from '@/router';
export default {
  components: {
        PaginationComponent,
  },
  data(){
    return{
        complaintList: [],
        pageSize: 10,
        currentPage: 0,
        searchValue: '',
        isLastPage: false,
        isLoading: false,
        totalPageCount: 0,
        displayedAccounts: [], // displayedAccounts 배열 추가
        cachedPages: {}, // 캐시된 페이지 데이터를 저장할 객체 추가
        isTrue: false,
        id: '',
    }
  },
  created() {
    this.loadComplaint();
  },
  methods: {
    async loadComplaint() {
      this.isLoading = true;
      try {
        const params = {
          page: this.currentPage,
          size: this.pageSize,
        }
        if (this.cachedPages[this.currentPage]) {
          this.displayedAccounts = this.cachedPages[this.currentPage];
        } else {
          const token = localStorage.getItem('access_token');
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/myComplaints`, { headers, params });
          this.complaintList = response.data.result.data.content;
          this.totalPageCount = response.data.result.data.totalPages;
          const addAccountList = response.data.result.data.content.map((account) => ({
            ...account,
            status: this.formatRole(account.status),
          }));
          if (addAccountList.length < this.pageSize) {
            this.isLastPage = true;
          }
          this.accountList = [...addAccountList];
          this.displayedAccounts = [...addAccountList]; // displayedAccounts에 데이터 할당
          this.cachedPages[this.currentPage] = [...addAccountList]; // 캐시에 데이터 저장
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
        finally {
        this.isLoading = false;
      }
    },
    changePage(pageNum) {
      this.currentPage = pageNum;
      this.loadComplaint();
    },
    formatRole(status) {
      switch (status) {
        case "BEFORE":
          return "답변 없음";
        case "REPLY":
          return "답변 완료";
        default:
          return status;
      }
    },
    getStatusColor(status) {
      return {
        'px-6 py-4 whitespace-nowrap text-center text-lg text-red-400': status === '답변 없음', // BEFORE 상태일 때 글자색을 빨간색으로 설정
        'px-6 py-4 whitespace-nowrap text-center text-lg text-green-400': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    getStatusBackground(status){
      return {
        'px-6 py-4 whitespace-nowrap text-center text-lg ': status === '답변 없음', // BEFORE 상태일 때 글자색을 빨간색으로 설정
        'px-6 py-4 whitespace-nowrap text-center text-lg': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    createComplaint(){
      router.push("/createComplaint");
    },
    ComplaintDetail(complaintId){
       router.push({ path: `/${complaintId}/complaintDetail`});
    },
  }
}
</script>

<style>

</style>