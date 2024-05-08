<template>
  <div v-if="isModalSelectUserOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
      <h2 class="text-white text-4xl">대상 고객 선택</h2>
        <span class="close" @click="closeSelectUserModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else>
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
                                <input type="date" id="searchBirthDate" v-model="searchBirthDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
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
            <div class="flex justify-between">
              <div style="margin-left: 10px; margin-top: 30px">
                  <span>페이지 크기:</span>
                  <select v-model="pageSize" @change="changePageSize" class="outline-none">
                      <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
                  </select>
              </div>
              <div style="text-align: right; margin-bottom: 10px; margin-right: 10px;">
                  <button @click="resetInputs" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-[120px] mr-3"> 입력값 초기화 </button>
                  <button @click="loadMarketingUser" class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]"> 검색 </button>
              </div>
          </div>
        </div>

        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px;">
            <table class="divide-y divide-gray-200" style="width: calc(100%); margin: 10px;" >
                <thead class="bg-gray-50">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input id="selectAllCheckbox" type="checkbox" v-model="isAllUsersSelected" @change="toggleAllUsersSelection"/>
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
                            등급
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" >
                    <tr v-for="user in userList" :key="user.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" :checked="selectedUsers.includes(user.id)" @change="toggleUserSelection(user.id)" style="cursor: pointer;" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span v-if="!user.editing">{{ user.name }}</span>
                        <input v-else type="text" v-model="user.name" @blur="cancelEdit(user)" @keyup.enter="saveEdit(user)">
                    </td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.gender === "MALE" ? '남성' : '여성' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.birthDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.email}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{user.grade}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between" style="width: calc(100% - 20px); margin: 10px;">
              <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 200px);" @click="publishCoupon">발행</button>
          </div>
        </div>

        <!-- 페이지네이션 컴포넌트 추가 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  components: {
      PaginationComponent,
  },
  props: ['isModalSelectUserOpen', 'selectedCoupons'],
  data() {
    return {
      userList: [],
      selectedUsers: [],
      searchName: '',
      searchEmail: '',
      searchBirthDate: '',
      searchGender: '',
      searchGrade: '',
      loading: false,
      isEditing: false,
      isAllUsersSelected: false, // 전체 선택 상태를 저장하는 변수 추가
      pageSize: 5,
      pageSizeOptions: [10, 25, 50, 100],
      currentPage: 0,
      searchValue: '',
      isLastPage: false,
      isLoading: false,
      totalPageCount: 0,
    };
  },
  created(){
      this.currentPage = 0;
      this.loadMarketingUser();
      
  },
  methods: {
    async loadMarketingUser() {
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
        this.loadMarketingUser();
    },
    closeSelectUserModal() {
      this.isEditing = false; // 수정 상태를 해제
      this.selectedUsers = []; // 선택된 사용자를 초기화
      this.$emit('close-modal');
    },
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    resetInputs() {
            this.searchName = '';
            this.searchEmail = '';
            this.searchBirthDate = '';
            this.searchGender = '';
            this.searchGrade = '';
            this.loadMarketingUser();
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

    async publishCoupon() {
          console.log(Object.keys(this.selectedCoupons));
          console.log (this.selectedUsers)
          try {
              const access_token = localStorage.getItem('access_token');
              const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};

              const data = {
                userIds: this.selectedUsers,
              };

              for (const couponId of Object.keys(this.selectedCoupons)) {
                  try {
                      await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/publish`, data, { headers });
                  } catch (error) {
                      console.error(`쿠폰 발행 중 오류 발생 (쿠폰 ID: ${couponId})`, error);
                      throw new Error('쿠폰 발행 중 오류 발생');
                  }
              }
              console.log('선택한 쿠폰이 성공적으로 발행되었습니다.');
              alert("쿠폰 발행 성공")
              window.location.reload();
          } catch (error) {
              console.error('쿠폰 발행 중 오류 발생', error);
              alert("발행 불가능한 쿠폰 입니다.")
          }
      },
      toggleAllUsersSelection() {
        if (this.isAllUsersSelected) {
          // 전체 사용자가 선택된 경우
          this.selectedUsers = this.userList.map(user => user.id); // 모든 사용자를 선택함
        } else {
          // 전체 사용자가 선택되지 않은 경우
          this.selectedUsers = []; // 선택된 사용자 목록을 비움
        }
      },
      toggleUserSelection(userId) {
        if (this.selectedUsers.includes(userId)) {
          // 이미 선택된 사용자라면, 해당 사용자를 선택 취소
          this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
        } else {
          // 선택되지 않은 사용자라면, 해당 사용자를 선택
          this.selectedUsers.push(userId);
        }
        // 전체 선택 상태를 업데이트
        this.isAllUsersSelected = this.selectedUsers.length === this.userList.length;
      },
  }
};
</script>

<style scoped>
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 800px; /* 예시로 너비를 800px로 조정 */
  height: 800px; /* 예시로 높이를 800px로 조정 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}



.close {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 24px;
  color: white;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

</style>