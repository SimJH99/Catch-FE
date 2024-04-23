<template>
  <div class="container mb-4 border border-gray-300 bg-white" style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
    <div class="text-white font-bold text-center mb-4" style="color: #f5a742; font-size: 3rem; margin-top: 50px">
      계정 조회
    </div>

    <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px;">
      <table class="table border border-gray-200 border-2" style="width: calc(100% - 20px); margin: 10px">
        <tbody>
          <tr>
            <th class="py-2 border border-gray-300 bg-gray-200" style="background-color: #f5a742; width: 20%; color: white">
              이름
            </th>
            <td class="px-4 border-t border-gray-300" style="width: 80%;">
              <input type="text" v-model="searchValue" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm" style="background-color: #DDDDDD; height: 2rem; width:50%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
            </td>
          </tr>
          <tr>
            <th class="py-2 border border-gray-300 bg-gray-200" style="background-color: #f5a742; width: 20%; color: white">
              사원번호
            </th>
            <td class="px-4 border-t border-gray-300" style="width: 80%;">
              <input type="text" v-model="searchValue" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm" style="background-color: #DDDDDD; height: 2rem; width:50%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
            </td>
          </tr>
          <tr>
            <th class="py-2 border border-gray-300 bg-gray-200" style="background-color: #f5a742; width: 20%; color: white">
              이메일
            </th>
            <td class="px-4 border-t border-gray-300" style="width: 80%;">
              <input type="text" v-model="searchValue" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm" style="background-color: #DDDDDD; height: 2rem; width:50%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
            </td>
          </tr>
          <tr>
            <th class="py-2 border border-gray-300 bg-gray-200" style="background-color: #f5a742; width: 20%; color: white">
              권한(역할)
            </th>
            <td class="px-4 border-t border-gray-300" style="width: 80%;">
              <select
                id="roleSelect"
                name="roleSelect"
                v-model="selectedRole"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
                style="background-color: #dddddd; height: 2rem; width: 25%; margin-top: 0.5rem; margin-bottom: 0.5rem;"
              >
                <option value="마케터" selected>마케터</option>
                <option value="CS 담당자">CS 담당자</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between">
        <div style="margin-left: 10px; margin-top: 30px">
          <span>페이지 크기:</span>
          <select v-model="pageSize" @change="changePageSize">
            <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
        <button
          @click="loadAccounts"
          class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded"
          style="width: 200px; text-align: center; margin-bottom: 10px;"
        >
          검색
        </button>
      </div>
    </div>

    <div class="container mb-4 border border-gray-300 bg-white" style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
      <table class="divide-y divide-gray-200" style="width: calc(100% - 20px); margin: 10px">
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
          <tr v-for="(admin, index) in accountList" :key="admin.id" @click="openAdminDetailModal(admin.id)" style="cursor: pointer;">
            <td class="px-6 py-4 whitespace-nowrap">{{ currentPage * pageSize + index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ admin.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ admin.employeeNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ admin.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ admin.role }}</td>
          </tr>   
        </tbody>
      </table>
      <div class="modal-content" @click.stop>
        <div class="modal-inner">
          <AdminDetailModal :isModalAdminDetailOpen="isModalAdminDetailOpen" :selectedAdminId="selectedAdminId" @close-modal="isModalAdminDetailOpen = false" />
        </div>
      </div>
      <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" style="margin-bottom: 25px;" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PaginationComponent from '@/components/PaginationComponent.vue';
import AdminDetailModal from "@/components/modal/AdminDetailModal.vue";

export default {
  components: {
    PaginationComponent,
    AdminDetailModal
  },
  data() {
    return {
      accountList: [],
      isLastPage: false,
      isLoading: false,
      selectedRole: "마케터",
      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
      currentPage: 0,
      searchValue: '',
      totalPageCount: 0,
      selectedAdminId: null,
      isModalAdminDetailOpen: false,

    };
  },
  created() {
    this.currentPage = 0;
    this.loadAccounts();
  },
  methods: {
    async loadAccounts() {
      try {
        const params = {
          page: this.currentPage,
          size: this.pageSize,
        };
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/all`, { headers, params });
        this.accountList = response.data.content;
        this.totalPageCount = response.data.totalPages;
      } catch (error) {
        console.log(error);
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
    changePage(pageNum) {
      this.currentPage = pageNum;
      this.loadAccounts();
    },
    changePageSize(event) {
      this.pageSize = parseInt(event.target.value);
      this.loadAccounts();
    },
    // 모달 열기
    openAdminDetailModal(id) {
      this.selectedAdminId = id;
      console.log("넘기는 id 값 : "+id);
      this.isModalAdminDetailOpen = true;
      console.log("List에서 클릭하면 열리는지 여부: ",this.isModalAdminDetailOpen);
    },
    closeAdminDetailModal() {
      this.isModalAdminDetailOpen = false;
      console.log(this.isModalAdminDetailOpen);
    },
  }
};
</script>

<style scoped>
/* 필요한 스타일을 추가하세요 */
</style>
