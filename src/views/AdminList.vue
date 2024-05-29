<template>
  <div>
    <div class="m-3 p-1 bg-white rounded-md shadow-md flex">
      <div class="text-4xl font-bold p-3">관리자 계정 관리</div>  
    </div>

    <div class="m-3 p-1 bg-white rounded-md shadow-md">
      <div class="container mb-4 mx-[10px]" style="width: calc(100% - 40px);">
        <table style="width: calc(100% - 20px); margin: 10px">
          <tbody>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">이름</th>
              <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                <input type="text" id="searchName" v-model="searchName" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
              </td>
            </tr>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">사원번호</th>
              <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                <input type="text" id="searchEmployeeNumber" v-model="searchEmployeeNumber" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
              </td>
            </tr>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">이메일</th>
              <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                <input type="text" id="searchEmail" v-model="searchEmail" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
              </td>
            </tr>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">권한(역할)</th>
              <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                <select id="searchRole" name="searchRole" v-model="searchRole" class="m-1 p-1 rounded-md w-48 outline-none">
                  <option value="마케터">마케터</option>
                  <option value="CS 담당자">CS 담당자</option>
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
              <button @click="loadAccounts" class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]"> 검색 </button>
          </div>
        </div>
      </div>

      <div class="container mb-4 bg-white"
        style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
        <table class="divide-y divide-gray-200" style="width: calc(100% - 20px); margin: 10px">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사원번호
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                권한(역할)</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(admin, index) in accountList" :key="admin.id" @click="openAdminDetailModal(admin.id)"
              style="cursor: pointer;">
              <td class="px-6 py-4 whitespace-nowrap">{{ currentPage * pageSize + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ admin.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ admin.employeeNumber }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ admin.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatRole(admin.role) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="modal-content" @click.stop>
          <div class="modal-inner">
            <AdminDetailModal :isModalAdminDetailOpen="isModalAdminDetailOpen" :selectedAdminId="selectedAdminId"
              @close-modal="isModalAdminDetailOpen = false" />
          </div>
        </div>
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage"
          style="margin-bottom: 25px;" />
      </div>
  </div>
</div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';
import AdminDetailModal from '@/components/modal/AdminDetailModal.vue'

export default {
  components: {
    PaginationComponent,
    AdminDetailModal
  },
  data() {
    return {
      accountList: [],
      searchName: '',
      searchEmployeeNumber: '',
      searchEmail: '',
      searchRole: '',
      searchId: '',
      selectedAdminId: null,

      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
      isLastPage: false,
      isLoading: false,
      currentPage: 0,
      totalPageCount: 0,
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
        const data = {};
        if (this.searchName.trim() !== '') {
          data.name = this.searchName;
        }
        if (this.searchEmployeeNumber.trim() !== '') {
          data.employeeNumber = this.searchEmployeeNumber;
        }
        if (this.searchEmail.trim() !== '') {
          data.email = this.searchEmail;
        }
        if (this.searchRole === "마케터") {
          data.role = "MARKETER";
        } else if (this.searchRole === "CS 담당자") {
          data.role = "CS";
        } else if (this.searchRole.trim() !== '') {
          data.role = this.searchRole;
        }
        console.log(data);
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/all`, data, { headers, params });
        this.accountList = response.data.result.data.content;
        this.totalPageCount = response.data.result.data.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    resetInputs() {
      this.searchName = '';
      this.searchEmployeeNumber = '';
      this.searchEmail = '';
      this.searchRole = '';
      this.loadAccounts();
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
      console.log("넘기는 id 값 : " + id);
      this.isModalAdminDetailOpen = true;
      console.log("List에서 클릭하면 열리는지 여부: ", this.isModalAdminDetailOpen);
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
