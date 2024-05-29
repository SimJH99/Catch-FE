<template>
  <div class="">
    <div class="m-3 p-1 bg-white rounded-md shadow-md flex">
      <div class="text-4xl font-bold p-3">1:1 문의글 관리</div>  
    </div>
    <div class="m-2 grid grid-cols-4">
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">총 문의글 수</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </div>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{allCount}}개</div>
      </div>
      
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">미 답변 문의글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{statusCount[0]}}개</div>
      </div>
      
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">답변 완료 문의글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{statusCount[1]}}개</div>
      </div>

      <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">오늘 작성된 문의글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </div>
          <div class="m-5 text-4xl font-bold text-center"> {{todayInfo}}개</div>
      </div>
    </div>

    <div class="m-3 p-1 bg-white rounded-md shadow-md">
        <div class="container mb-4 mx-[10px]" style="width: calc(100% - 40px);">
            <table style="width: calc(100% - 20px); margin: 10px"> 
                <tbody>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">고객 이름</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" v-model="name" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">문의글 제목</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" v-model="title" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">답변 여부</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                        <select v-model="status" class="m-1 p-1 rounded-md w-48 outline-none">
                            <!-- <option :value="null">--선택--</option> -->
                            <option value="BEFORE">답변 없음</option>
                            <option value="REPLY">답변 완료</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                      <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">카테고리</th>
                      <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                      <select v-model="category" class="m-1 p-1 rounded-md w-48 outline-none">
                          <option value="DELIVERY">배송</option>
                          <option value="ORDER">주문/결제</option>
                          <option value="CANCEL/EXCHANGE/REFUND">취소/교환/환불</option>
                          <option value="MYINFO">회원정보</option>
                          <option value="CONFIRMATION">상품확인</option>
                          <option value="SERVICE">서비스</option>
                      </select>
                      </td>
                  </tr>
                </tbody>
            </table>
            <div class="flex justify-between">
              <div style="margin-left: 10px; margin-top: 30px">
                  <span>페이지 크기:</span>
                  <select v-model="pageSize" @change="changePageSize" class="outline-none">
                      <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
                  </select>
              </div>
              <div style="text-align: right; margin-bottom: 10px; margin-right: 10px;">
                  <button @click="resetInputs" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-[120px] mr-3"> 입력값 초기화 </button>
                  <button @click="searchComplaint" class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]"> 검색 </button>
              </div>
            </div>
        </div>

        <div class="container" style="width: calc(100% - 40px); margin: 10px">
            <table
              class="divide-y divide-gray-200"
              style="width: calc(100% - 20px); margin: 10px"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">답변 상태</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(account, index) in displayedAccounts" :key="account.id" @click="openComplaintDetailModal(account.complaintId)" style="cursor: pointer;">
                    <td :class="getStatusBackground(account.status)">{{ currentPage * pageSize + index + 1 }}</td>
                    <td :class="getStatusBackground(account.status)">{{ account.name }}</td>
                    <td :class="getStatusBackground(account.status)">{{ account.title }}</td>
                    <td :class="getStatusBackground(account.status)">
                      <span v-if="account.category === 'DELIVERY'">배송</span>
                      <span v-else-if="account.category === 'ORDER'">주문/결제</span>
                      <span v-else-if="account.category === 'CANCEL/EXCHANGE/REFUND'">취소/교환/환불</span>
                      <span v-else-if="account.category === 'MYINFO'">회원정보</span>
                      <span v-else-if="account.category === 'CONFIRMATION'">상품확인</span>
                      <span v-else-if="account.category === 'SERVICE'">서비스</span>
                    </td>
                    <td :class="getStatusColor(account.status)">
                      {{ account.status }}
                    </td>
                </tr>          
              </tbody>
            </table>
            <div class="modal-content" @click.stop>
              <div class="modal-inner">
                <ComplaintDetailModal :isModalComplaintDetailOpen="isModalComplaintDetailOpen" :selectedComplaintId="selectedComplaintId" @close-modal="isModalComplaintDetailOpen = false" />
              </div>
            </div>
            <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage"/>
          </div>
        </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';
import router from '@/router';
import ComplaintDetailModal from '@/components/modal/ComplaintDetailModal.vue';

export default {
  components: {
        PaginationComponent, 
        ComplaintDetailModal
  },
  data() {
    return {
      complaintList: [],
      pageSizeOptions: [10, 25, 50, 100],
      pageSize: 10,
      currentPage: 0,
      searchValue: '',
      isLastPage: false,
      isLoading: false,
      totalPageCount: 0,
      displayedAccounts: [], // displayedAccounts 배열 추가
      cachedPages: {}, // 캐시된 페이지 데이터를 저장할 객체 추가
      isTrue: false,
      allCount: '',
      statusInfo: [],
      complaintStatus: [],
      statusCount: [],
      selectedComplaintId: '',
      isModalComplaintDetailOpen: false,
      todayInfo: {},
    };
  },
  created() {
    this.fetchComplaint();
    this.searchComplaint();
  },
  methods: {
    async fetchComplaint(){
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const allCountRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countAll`, { headers });
        this.allCount = allCountRes.data.result.data;
        const statusRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countStatus`, { headers });
        const todayRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/countToday`, { headers });
        this.statusInfo = statusRes.data.result.data;
        this.todayInfo = todayRes.data.result.data

        for(var i = 0; i < this.statusInfo.length; i++){
          this.complaintStatus.push(this.statusInfo[i][0]);
          this.statusCount.push(this.statusInfo[i][1]);
        }

      } catch (error) {
        console.log(error);
      }

    },
    async searchComplaint() { 
      this.displayedAccounts = [],
      this.cachedPages = {}
      this.currentPage = 0;
      this.loadComplaint();
    },
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
          const registerData = {complaintId: this.complaintId, name: this.name, title: this.title, status: this.status, category:this.category};
          const token = localStorage.getItem('access_token');
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/list`, registerData ,{ headers, params });
          this.complaintList = response.data.result.data.content;
          this.totalPageCount = response.data.result.data.totalPages;
          console.log(response);
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
    changePageSize(event) {
        this.pageSize = parseInt(event.target.value);
        this.searchComplaint();
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
        'px-6 py-4 whitespace-nowrap text-red-400': status === '답변 없음', // BEFORE 상태일 때 글자색을 빨간색으로 설정
        'px-6 py-4 whitespace-nowrap text-green-400 bg-gray-100': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    getStatusBackground(status){
      return {
        'px-6 py-4 whitespace-nowrap': status === '답변 없음', // BEFORE 상태일 때 글자색을 빨간색으로 설정
        'px-6 py-4 whitespace-nowrap bg-gray-100': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    ComplaintDetail(complaintId) {
        router.push({ name: 'ComplaintDetail', params: { complaintId: complaintId }
      });
    },
    // 모달 열기
    openComplaintDetailModal(id) {
      this.selectedComplaintId = id;
      this.isModalComplaintDetailOpen = true;
    },
    closeComplaintDetailModal() {
      this.isModalComplaintDetailOpen = false;
      console.log(this.isModalComplaintDetailOpen);
    },
    resetInputs() {
        this.complaintId = null;
        this.name = null;
        this.title = null;
        this.status = null;
        this.category = null;
        this.searchComplaint();
    },
  },
}

</script>

<style>

</style>