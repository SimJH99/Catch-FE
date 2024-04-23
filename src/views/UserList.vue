<template>
    <div class="container mb-4 border border-gray-300 bg-white"
        style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
        <div class="text-white font-bold text-center mb-4" style="color: #f5a742; font-size: 3rem; margin-top: 50px">
            고객 계정 조회
        </div>

        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px;">
            <table class="table border border-gray-200 border-2" style="width: calc(100% - 20px); margin: 10px">
                <tbody>
                    <tr>
                        <th class="py-2 border border-gray-300 bg-gray-200"
                            style="background-color: #f5a742; width: 20%; color: white">
                            고객명
                        </th>
                        <td class="px-4 border-t border-gray-300" style="width: 80%;">
                            <input type="text" id="searchName" v-model="searchName"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                                style="background-color: #DDDDDD; height: 2rem; width:50%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300 bg-gray-200"
                            style="background-color: #f5a742; width: 20%; color: white">
                            이메일
                        </th>
                        <td class="px-4 border-t border-gray-300" style="width: 80%;">
                            <input type="text" id="searchEmail" v-model="searchEmail"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                                style="background-color: #DDDDDD; height: 2rem; width:50%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300 bg-gray-200"
                            style="background-color: #f5a742; width: 20%; color: white">
                            생일
                        </th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchBirthDate" v-model="searchBirthDate"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                                    style="background-color: #dddddd; height: 2rem; width: 25%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300 bg-gray-200"
                            style="background-color: #f5a742; width: 20%; color: white">
                            성별
                        </th>
                        <td class="px-4 border-t border-gray-300" style="width: 80%;">
                            <select id="searchRole" v-model="searchGender"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
                                style="background-color: #dddddd; height: 2rem; width: 25%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                                <option value="남자">남자</option>
                                <option value="여자">여자</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300 bg-gray-200"
                            style="background-color: #f5a742; width: 20%; color: white">
                            등급
                        </th>
                        <td class="px-4 border-t border-gray-300" style="width: 80%;">
                            <select id="searchGrade" v-model="searchGrade"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block px-3 py-1 rounded-md border-gray-300 shadow-sm sm:text-sm"
                                style="background-color: #dddddd; height: 2rem; width: 25%; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                                <option value="VVIP">VVIP</option>
                                <option value="VIP">VIP</option>
                                <option value="GOLD">GOLD</option>
                                <option value="SILVER">SILVER</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: right; margin-bottom: 10px;">
                <button @click="resetInputs"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    입력값 초기화
                </button>
            </div>
            <div class="flex justify-between">
                <div style="margin-left: 10px; margin-top: 30px">
                    <span>페이지 크기:</span>
                    <select v-model="pageSize" @change="changePageSize">
                        <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
                    </select>
                </div>
                <button @click="loadUsers"
                    class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded"
                    style="width: 200px; text-align: center; margin-bottom: 10px;">
                    검색
                </button>
            </div>
        </div>
        <div class="container mb-4 border border-gray-300 bg-white"
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
            <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage"
                style="margin-bottom: 25px;" />
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

    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped></style>
