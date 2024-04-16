<template>
  <div class="">
    <div class="mx-3 mt-3 p-1 bg-white rounded-md">
        <div class="text-4xl font-bold p-3 border-b-2 border-gray-300"> 문의 게시글 리스트 </div>
    </div>

    <div class="m-3 grid grid-cols-3">
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">총 게시글 수</div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
        </div>
        <a href="/userList">
          <div class="m-5 text-4xl font-bold text-center"> 30명</div>
        </a>
      </div>
      
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">미 답변 게시글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        </div>
        <a href="/complaintList">
          <div class="m-5 text-4xl font-bold text-center"> 65개</div>
        </a>
      </div>
      
      <div class="bg-white m-2 p-2 rounded-md py-5 px-4">
        <div class="flex">
          <div class="text-xl font-bold text-gray-500 mr-2">답변 완료 게시글</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
          </svg>
        </div>
        <a href="/couponList">
          <div class="m-5 text-4xl font-bold text-center"> 8개</div>
        </a>
      </div>
    </div>

    <div class="m-3 p-1 bg-white rounded-md">
        <div class="container mb-4 border-b-2 border-gray-300" style="width: calc(100% - 40px); margin: 10px;">
            <table class="table border-gray-400 border-2" style="width: calc(100%); margin: 10px;"> 
                <tbody>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;" >게시글 번호</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" v-model="complaintId" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base"> <!-- 너비 조정 -->
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;">고객 이름</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" v-model="name" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;">게시글 제목</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" v-model="title" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;">답변 여부</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                        <select class="custom-select m-1 p-1 border rounded-md" v-model="status">
                            <option :value="null">--선택--</option>
                            <option value="BEFORE">답변 없음</option>
                            <option value="REPLY">답변 완료</option>
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button 
                class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded" 
                style="width: 200px; text-align: center; margin-left: calc(100% - 210px); margin-bottom: 10px;"
                @click="searchComplaint"
            >검색</button>
        </div>

        <div class="container" style="width: calc(100% - 40px); margin: 10px">
            <table
              class="divide-y divide-gray-200"
              style="width: calc(100% - 20px); margin: 10px"
            >
              <thead class="bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3 w-1/6 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th scope="col" class="px-6 py-3 w-1/6 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th scope="col" class="px-6 py-3 w-3/6 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th scope="col" class="px-6 py-3 w-1/6 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">답변 상태</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(account) in displayedAccounts" :key="account.id" @click="ComplaintDetail(account.id)">
                    <td :class="getStatusBackground(account.status)">{{ account.complaintId }}</td>
                    <td :class="getStatusBackground(account.status)">{{ account.name }}</td>
                    <td :class="getStatusBackground(account.status)">{{ account.title }}</td>
                    <td :class="getStatusColor(account.status)">
                      {{ account.status }}
                    </td>
                </tr>          
              </tbody>
            </table>
            <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage"/>
          </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  components: {
        PaginationComponent,
  },
  data() {
    return {
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
    };
  },
  methods: {
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
          const registerData = {complaintId: this.complaintId, name: this.name, title: this.title, status: this.status};
          const token = localStorage.getItem('access_token');
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/list`, registerData ,{ headers, params });
          this.complaintList = response.data.result.data.content;
          this.totalPageCount = response.data.result.data.totalPages;
          console.log(response.data.result.data);
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
        'px-6 py-4 whitespace-nowrap text-center text-lg text-green-400 bg-gray-50': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    getStatusBackground(status){
      return {
        'px-6 py-4 whitespace-nowrap text-center text-lg ': status === '답변 없음', // BEFORE 상태일 때 글자색을 빨간색으로 설정
        'px-6 py-4 whitespace-nowrap text-center text-lg bg-gray-50': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    ComplaintDetail(id) {
      // 특정 ID에 해당하는 계정 상세 정보 페이지로 이동
      this.$router.push({ name: 'ComplaintDetail', params: { id: id } });
    },
  },
}

</script>

<style lang="scss" scoped>

</style>