<template>
    <div class="">
        <div class=" m-3 p-1 bg-white rounded-md shadow-md flex">
            <div class="text-4xl font-bold p-3 border-gray-300">고객 계정 조회</div>  
        </div>

        <div class="m-2 grid grid-cols-4">
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">총 고객</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                </div>
              </div>
                <div class="m-5 text-4xl font-bold text-center"> 30명</div>
            </div>
            
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">신규 회원</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </div>
                <div class="m-5 text-4xl font-bold text-center"> 30명</div>
            </div>
            
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">템플릿 1</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <div class="flex m-5 justify-center">
                  <div class="text-4xl font-bold text-right"> 30</div>
                  <div class="mt-3 text-xl font-bold text-center"> /120개</div>
              </div>
            </div>
      
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">만료 임박 쿠폰</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
                <div class="m-5 text-4xl font-bold text-center"> 30개</div>
            </div>
          </div>

        <div class="m-3 p-1 bg-white rounded-md shadow-md">
            <div class="container mb-4 mx-[10px]" style="width: calc(100% - 40px);">
                <table style="width: calc(100% - 20px); margin: 10px">
                    <tbody>
                        <tr>
                            <th class="p-2 border border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">고객 이름</th>
                            <td class="px-4 border border-gray-400" style="width: 80%;">
                                <input type="text" id="searchName" v-model="searchName" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">이메일</th>
                            <td class="px-4 border border-gray-400" style="width: 80%;">
                                <input type="text" id="searchEmail" v-model="searchEmail" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">생년월일</th>
                            <td class="px-4 border border-gray-400" style="width: 80%;">
                                <div class="flex">
                                    <input type="date" id="searchBirthDate" v-model="searchBirthDate" class="m-1 p-1 rounded-md w-48 outline-none">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">성별</th>
                            <td class="px-4 border border-gray-400" style="width: 80%;">
                                <select id="searchRole" v-model="searchGender" class="m-1 p-1 rounded-md w-48 outline-none">
                                    <option value="남자">남자</option>
                                    <option value="여자">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">등급</th>
                            <td class="px-4 border border-gray-400" style="width: 80%;">
                                <select id="searchGrade" v-model="searchGrade" class="m-1 p-1 rounded-md w-48 outline-none">
                                    <option value="VVIP">VVIP</option>
                                    <option value="VIP">VIP</option>
                                    <option value="GOLD">GOLD</option>
                                    <option value="SILVER">SILVER</option>
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
                        <button @click="loadUsers" class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]"> 검색 </button>
                    </div>
                </div>


                    
            </div>
            <div class="container mb-4 border-gray-300 bg-white"
                style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
                <table class="divide-y divide-gray-200" style="width: calc(100% - 20px); margin: 10px">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객명
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">생년월일
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전화번호
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">성별
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등급
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(user, index) in userList" :key="user.id" @click="openUserDetailModal(user.id)"
                            style="cursor: pointer;">
                            <td class="px-6 py-4 whitespace-nowrap">{{ currentPage * pageSize + index + 1 }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.birthDate }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.phoneNumber }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.gender === "MALE" ? '남성' : '여성' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.grade }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="modal-content" @click.stop>
                    <div class="modal-inner">
                        <UserDetailModal :isModalUserDetailOpen="isModalUserDetailOpen" :selectedUserId="selectedUserId"
                            @close-modal="isModalUserDetailOpen = false" />
                    </div>
                </div>
                <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" style="margin-bottom: 25px;" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';
import UserDetailModal from '@/components/modal/UserDetailModal.vue';

export default {
    components: {
        PaginationComponent,
        UserDetailModal,
    },
    data() {
        return {
            userList: [],
            selectedUserId: '',
            searchName: '',
            searchEmail: '',
            searchBirthDate: '',
            searchPhoneNumber: '',
            searchGender: '',
            searchGrade: '',

            pageSize: 10,
            pageSizeOptions: [10, 25, 50, 100],
            currentPage: 0,
            isLastPage: false,
            isLoading: false,
            totalPageCount: 0,
            isModalUserDetailOpen: false,
        }
    },
    created() {
        this.currentPage = 0;
        this.loadUsers();
    },
    methods: {
        async loadUsers() {
            try {
                const params = {
                    page: this.currentPage,
                    size: this.pageSize,

                }
                console.log("data 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
                const data = {};
                if (this.searchName.trim() !== '') {
                    data.name = this.searchName;
                }
                if (this.searchBirthDate.trim() !== '') {
                    data.birthDate = this.searchBirthDate;
                }
                if (this.searchEmail.trim() !== '') {
                    data.email = this.searchEmail;
                }
                if (this.searchGender === "남자") {
                    data.gender = "MALE";
                } else if (this.searchGender === "여자") {
                    data.gender = "FEMALE";
                } else if (this.searchGender.trim() !== '') {
                    data.gender = this.searchGender;
                }
                if (this.searchGrade.trim() !== '') {
                    data.grade = this.searchGrade;
                }
                console.log(data);
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/search`, data, { headers, params });
                this.userList = response.data.result.data;
                this.totalPageCount = response.data.result.totalPage;
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
        changePage(pageNum) {
            this.currentPage = pageNum;
            this.loadUsers();
        },
        changePageSize(event) {
            this.pageSize = parseInt(event.target.value);
            this.loadUsers();
        },
        // 모달 열기
        openUserDetailModal(id) {
            this.selectedUserId = id;
            console.log("넘기는 id 값 : " + id);
            this.isModalUserDetailOpen = true;
            console.log("List에서 클릭하면 열리는지 여부: ", this.isModalUserDetailOpen);
        },
        closeUserDetailModal() {
            this.isModalUserDetailOpen = false;
            console.log(this.isModalUserDetailOpen);
        },
        resetInputs() {
            this.searchName = '';
            this.searchEmail = '';
            this.searchBirthDate = '';
            this.searchPhoneNumber = '';
            this.searchGender = '';
            this.searchGrade = '';
            this.loadUsers();
        },
    },
}
</script>

<style>
</style>
