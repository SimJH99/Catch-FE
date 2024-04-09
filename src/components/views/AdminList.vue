<template>
  <div class="min-h-screen flex flex-col items-center">
    <div
      class="text-white font-bold text-center mb-4"
      style="color: #f5a742; font-size: 3rem; margin-top: 50px"
    >
      계정 조회
    </div>

    <div
      class="container mb-4"
      style="
        width: calc(100% - 40px);
        margin: 10px;
        border-bottom: 1px solid #ccc;
      "
    >
      <table
        class="table border border-gray-200 border-2"
        style="width: calc(100% - 20px); margin: 10px"
      >
        <tbody>
          <tr>
            <th
              class="py-2 border border-gray-300"
              style="background-color: #f5a742; width: 20%; color: white"
            >
              이름
            </th>
            <td class="px-4 border border-gray-300" style="width: 80%">
              <input
                type="text"
                id="nameInput"
                name="nameInput"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </td>
          </tr>
          <tr>
            <th
              class="py-2 border border-gray-300"
              style="background-color: #f5a742; width: 20%; color: white"
            >
              사원번호
            </th>
            <td class="px-4 border border-gray-300" style="width: 80%">
              <input
                type="text"
                id="employeeIdInput"
                name="employeeIdInput"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </td>
          </tr>
          <tr>
            <th
              class="py-2 border border-gray-300"
              style="background-color: #f5a742; width: 20%; color: white"
            >
              이메일
            </th>
            <td class="px-4 border border-gray-300" style="width: 80%">
              <input
                type="email"
                id="emailInput"
                name="emailInput"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </td>
          </tr>
          <tr>
            <th
              class="py-2 border border-gray-300"
              style="background-color: #f5a742; width: 20%; color: white"
            >
              권한(역할)
            </th>
            <td class="px-4 border border-gray-300" style="width: 80%">
              <select
                id="roleSelect"
                name="roleSelect"
                v-model="selectedRole"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"
              >
                <option value="마케터">마케터</option>
                <option value="CS 담당자">CS 담당자</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="loadAccounts"
        class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded"
        style="
          width: 200px;
          text-align: center;
          margin-left: calc(100% - 200px);
          margin-bottom: 10px;
        "
      >
        검색
      </button>
    </div>

    <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px">
      <table
        class="divide-y divide-gray-200"
        style="width: calc(100% - 20px); margin: 10px"
      >
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사원번호</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">권한(역할)</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(account, index) in displayedAccounts" :key="account.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ account.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ account.employeeNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ account.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ account.role }}</td>
          </tr>          
        </tbody>
      </table>
      <div class="flex items-center justify-center">
        <!-- 이전 페이지로 이동하는 화살표 버튼 -->
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="font-bold py-2 px-4 rounded mr-2"
          style="margin-right: auto"
        >
          ⬅︎
        </button>
      
        <!-- 페이지 번호 버튼 -->
        <div class="flex">
          <button
            v-for="pageNumber in generatePageNumbers()"
            :key="pageNumber"
            @click="goToPage(pageNumber)"
            :class="{ 'bg-gray-800 text-white': pageNumber === currentPage, 'bg-gray-300 hover:bg-gray-400 text-gray-800': pageNumber !== currentPage }"
            class="font-bold py-2 px-4 mx-1 rounded"
          >
            {{ pageNumber }}
          </button>
        </div>
      
        <!-- 다음 페이지로 이동하는 화살표 버튼 -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="font-bold py-2 px-4 rounded ml-2"
          style="margin-left: auto"
        >
          ➡︎
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      accountList: [],
      isLastPage: false,
      isLoading: false,
      selectedRole: "",
      pageSize: 10,
      currentPage: 0,
      totalPages: 0,
      displayedAccounts: [], // displayedAccounts 배열 추가
      cachedPages: {}, // 캐시된 페이지 데이터를 저장할 객체 추가
    };
  },
  created() {
    this.currentPage = 1;
    this.loadAccounts();
  },
  methods: {
    async loadAccounts() {
      try {
        this.isLoading = true;
        const params = {
          page: this.currentPage - 1,
          size: this.pageSize,
        };

        // 페이지 데이터가 캐시에 있는지 확인
        if (this.cachedPages[this.currentPage]) {
          this.displayedAccounts = this.cachedPages[this.currentPage];
        } else {
          const access_token = localStorage.getItem("access_token");
          const headers = access_token
            ? { Authorization: `Bearer ${access_token}` }
            : {};
          const response = await axios.get(
            `${process.env.VUE_APP_API_BASE_URL}/admin/all`,
            { params, headers }
          );
          this.totalPages = response.data.totalPages;
          const addAccountList = response.data.content.map((account) => ({
            ...account,
            role: this.formatRole(account.role),
          }));
          if (addAccountList.length < this.pageSize) {
            this.isLastPage = true;
          }
          this.accountList = [...addAccountList];
          this.displayedAccounts = [...addAccountList]; // displayedAccounts에 데이터 할당
          this.cachedPages[this.currentPage] = [...addAccountList]; // 캐시에 데이터 저장
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    formatRole(role) {
      switch (role) {
        case "MARKETER":
          return "마케터";
        case "CS":
          return "CS 담당자";
        default:
          return role;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadAccounts(); // 이전 페이지로 이동할 때마다 계정 정보를 다시 불러옴
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadAccounts(); // 다음 페이지로 이동할 때마다 계정 정보를 다시 불러옴
      }
    },
    goToPage(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.loadAccounts(); // 특정 페이지로 이동할 때마다 계정 정보를 다시 불러옴
      }
    },
    generatePageNumbers() {
  const currentPage = this.currentPage;
  const totalPages = this.totalPages;
  const pages = [];

  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    let startPage = 1;
    if (currentPage > 10) {
      startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    }
    const endPage = Math.min(startPage + 9, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
},

  },
};
</script>

<style scoped>
/* 필요한 스타일을 추가하세요 */
</style>
