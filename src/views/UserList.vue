<template>
    <div class="">
        <div class=" m-3 p-1 bg-white rounded-md shadow-md flex">
            <div class="text-4xl font-bold p-3 border-gray-300">고객 계정 조회</div>  
        </div>

        <div class="m-3 flex">
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border w-1/4">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">오늘 방문자 수</div>
                <div>
                  <svg @click="toggleHelp" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                  <div v-if="showHelp" class="help-bubble">
                    <p>이곳에 도움말 내용을 입력하세요.</p>
                  </div>
                </div>
              </div>
                <div class="mt-[52px] mb-5 text-4xl font-bold text-center h-auto"> {{ visitUser}}명</div>
            </div>
            
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md border w-3/4">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">신규 회원 가입</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>        
              </div>
              <div class="grid grid-cols-3 divide-x-2 divide-gray-300">
                <div>
                  <div class="font-semibold text-[17px] mt-2 ml-2 text-gray-500">일간</div>
                  <div class="flex items-end place-content-center">
                    <div class="ml-5 mr-2 my-5 text-4xl font-bold"> {{ this.signUpUser.dayUser }}명 </div>
                    <div :class="getCountBackground( this.signUpUser.lastDayUser)"> {{ this.lastDayUser }} </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-red-500" v-if="dayColorCheck">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-blue-500" v-if="!dayColorCheck">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                    </svg>  
                  </div>
                </div>
                <div>
                  <div class="font-semibold text-[17px] mt-2 ml-2 text-gray-500">주간</div>
                  <div class="flex items-end place-content-center">
                    <div class="ml-5 mr-2 my-5 text-4xl font-bold"> {{ this.signUpUser.weekUser }}명 </div>
                    <div :class="getCountBackground( this.signUpUser.lastWeekUser)"> {{ this.lastWeekUser }} </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-red-500" v-if="weekColorCheck">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-blue-500" v-if="!weekColorCheck">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div class="font-semibold text-[17px] mt-2 ml-2 text-gray-500">월간</div>
                  <div class="flex items-end place-content-center">
                    <div class="ml-5 mr-2 my-5 text-4xl font-bold"> {{ this.signUpUser.monthUser }}명 </div>
                    <div :class="getCountBackground( this.signUpUser.lastMonthUser)"> {{ this.lastMonthUser }} </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-red-500" v-if="monthColorCheck">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-5 text-blue-500" v-if="!monthColorCheck">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                    </svg>
                  </div>
                </div>
              </div>
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
                                    <option value="남성">남성</option>
                                    <option value="여성">여성</option>
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
import axios from "@/axios/index";
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
            showHelp: false,
            lastDayUser:'',
            lastWeekUser:'',
            lastMonthUser:'',
            dayColorCheck: false,
            weekColorCheck: false,
            monthColorCheck: false,
            visitUser: {},
            signUpUser: {},

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
        this.fetchData();
    },
    methods: {
    async fetchData(){
      try {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const visitUserRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/visit/today/user`, { headers });
        const signUpUserRes = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/signUp/user`, { headers });
        this.visitUser = visitUserRes.data.result.data;
        this.signUpUser = signUpUserRes.data.result.data;

        if(this.signUpUser.lastDayUser >= 0){
          this.dayColorCheck = true;
        }

        if(this.signUpUser.lastWeekUser >= 0){
          this.weekColorCheck = true;
        }

        if(this.signUpUser.lastMonthUser >= 0){
          this.monthColorCheck = true;
        }

        this.lastDayUser = this.signUpUser.lastDayUser >= 0 ? '+' + this.signUpUser.lastDayUser : this.signUpUser.lastDayUser.toString();
        this.lastWeekUser = this.signUpUser.lastWeekUser >= 0 ? '+' + this.signUpUser.lastWeekUser : this.signUpUser.lastWeekUser.toString();
        this.lastMonthUser = this.signUpUser.lastMonthUser >= 0 ? '+' + this.signUpUser.lastMonthUser : this.signUpUser.lastMonthUser.toString();

      } catch (error) {
        console.log(error);
      }
    },
    getCountBackground(count){
      return {
        'my-5 text-xl text-red-500': count >= 0, 
        'my-5 text-xl text-blue-500': count < 0 // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
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
                if (this.searchGender === "남성") {
                    data.gender = "MALE";
                } else if (this.searchGender === "여성") {
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
