<template>
    <div class="min-h-screen flex flex-col items-center">
        <div class="container border-4">
            UserList
        </div>
        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px; border-bottom: 1px solid #ccc;">
            <table class="table border-gray-200 border-2" style="width: calc(100%); margin: 10px;"> 
                <tbody>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;" >고객명</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="searchName" v-model="searchName" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">고객 E-Mail</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="searchEmail" v-model="searchEmail" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">생일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchBrithDate" v-model="searchBrithDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">성별</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <select id="searchGender" v-model="searchGender">
                              <option value="남자">남자</option>
                              <option value="여자">여자</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">등급</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <select id="searchGrade" v-model="searchGrade">
                                <option value="VVIP">VVIP</option>
                                <option value="VIP">VIP</option>
                                <option value="골드">골드</option>
                                <option value="실버">실버</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button 
                class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded" 
                style="width: 200px; text-align: center; margin-left: calc(100% - 210px); margin-bottom: 10px;"
                @click="searchCoupons"
            >검색</button>
        </div>

        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px;">
            <table class="divide-y divide-gray-200" style="width: calc(100%); margin: 10px;" >
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            NO
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            고객명
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            성별
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            생일
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            고객 E-mail
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            고객 상태
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            등급
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            전화번호
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            주소
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            마케팅
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" >
                    <tr v-for="user in userList" :key="user.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{user.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.gender === "MALE" ? '남성' : '여성' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.birthDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.email}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.active ? '활성' : '비활성' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.grade}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.phoneNumber}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.address + " " +  user.zipcode + " " + user.detailAddress}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.consentReceiveMarketing ? 'YES' : 'No'}}</td>
                        <td class="px-6 py-4 whitespace-nowrap"><button @click.stop="updateUser(user.id)" class="btn btn-success">수정</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 페이지네이션 컴포넌트 추가 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" />
        
    </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
    components: {
        PaginationComponent,
    },
    data(){
        return{
            userList: [],
            selectedUsers: [],
            searchName: '',
            searchEmail: '',
            searchBrithDate: '',
            searchGender: '',
            searchGrade: '',

            pageSize: 2,
            currentPage: 0,
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            totalPageCount: 0,
        }
    },
    created(){
        this.loadUsers();
    },
    methods:{

        async loadUsers(){
            try{
                const params = {
                page: this.currentPage,
                size: this.pageSize,
                
                }
                console.log("data 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/user/list`, { headers, params });
                this.userList = response.data.result.data;
                this.totalPageCount = response.data.result.totalPage;
                console.log(response);
                console.log(this.totalPageCount);
            }catch(error){
                console.log(error);
            }
        },
        changePage(pageNum) {
            this.currentPage = pageNum;
            this.loadUsers();
        },
        async searchUsers(){
            try{
                console.log("search 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const data = {
                        name: this.searchName,
                        email: this.searchEmail,
                        brithDate: this.searchBrithDate,
                        gender: this.searchGender,
                        grade: this.searchGrade,
                    };
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/user/search`, data ,{headers});
                this.couponList = response.data.result.data;
                this.totalPageCount = response.data.result.totalPage;
                console.log(this.couponList);
            }catch(error){
                console.log(error);
            }
        },
    },

    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
