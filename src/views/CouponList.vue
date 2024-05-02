<template>
    <div class="">
        <div class="mx-3 mt-3 p-1 bg-white rounded-md shadow-md">
            <div class="text-4xl font-bold p-3 border-gray-300"> 쿠폰 리스트 </div>
        </div>
        
        <div class="m-2 grid grid-cols-4">
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">총 쿠폰</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                </div>
              </div>
                <div class="m-5 text-4xl font-bold text-center"> 30개</div>
            </div>
            
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">발행 중인 쿠폰</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              </div>
                <div class="m-5 text-4xl font-bold text-center"> 30개</div>
            </div>
            
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">사용한 쿠폰 / 발급 쿠폰</div>
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
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px; border-bottom: 1px solid #ccc;">
            <table class="table border-gray-200 border-2" style="width: calc(100%); margin: 10px;"> 
                <tbody>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;" >쿠폰명</th>
                        <td class="px-2 border-2 border-gray-300 " style="width: 80%;">
                            <input type="text" id="searchName" v-model="searchName" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">쿠폰코드</th>
                        <td class="px-2 border border-gray-300" style="width: 80%;">
                            <input type="text" id="searchCode" v-model="searchCode" class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
                        <td class="px-2 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchStartDate" v-model="searchStartDate" class="m-1 p-1 rounded-md w-48 outline-none hover:bg-gray-100 active:bg-gray-200">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">마감일</th>
                        <td class="px-2 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchEndDate" v-model="searchEndDate" class="m-1 p-1 rounded-md w-48 outline-none">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">쿠폰 상태</th>
                        <td class="px-2 border border-gray-300" style="width: 80%;">
                            <select id="searchCouponStatus" v-model="searchCouponStatus" class="m-1 p-1 rounded-md w-48 outline-none">
                              <option value="발급">발급</option>
                              <option value="삭제">삭제</option>
                              <option value="발행">발행</option>
                              <option value="만료">만료</option>
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
                    <button @click="searchCoupons" class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]"> 검색 </button>
                </div>
              </div>
        </div>
        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px;">
            <table class="divide-y divide-gray-200" style="width: calc(100%); margin: 10px;" >
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input id="selectAllCheckbox" type="checkbox" @change="selectAllCoupons"/>
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            쿠폰명
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            쿠폰 코드
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            쿠폰 상태
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            쿠폰 수량
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            시작일
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            마감일
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" >
                    <tr v-for="coupon in couponList" :key="coupon.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" :checked="selectedCoupons[coupon.id]" @change="updateSelectedCoupons(coupon.id)" style="cursor: pointer;">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span v-if="!coupon.editing">{{ coupon.name }}</span>
                            <input v-else type="text" v-model="coupon.name" @blur="cancelEdit(coupon)" @keyup.enter="saveEdit(coupon)">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.code}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.status}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.quantity}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.startDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.endDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap"><button @click.stop="openCouponDetailModal(coupon.id)" class="btn">수정</button></td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="modal-content" @click.stop>
            <div class="modal-inner">
                <CouponDetailModal :isModalCouponDetailOpen="isModalCouponDetailOpen" :selectedCouponDetailsId="selectedCouponDetailsId"
                    @close-modal="isModalCouponDetailOpen = false" />
            </div>
        </div>
        
        <!-- 페이지네이션 컴포넌트 추가 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage"/>

        <div class="flex justify-between" style="width: calc(100% - 20px); margin: 10px;">
            <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 400px);" @click="openSelectUserModal">발행</button>
            <SelectUserModal :isModalSelectUserOpen="isModalSelectUserOpen" :selectedCoupons="selectedCoupons" @close-modal="isModalSelectUserOpen = false"/>
            <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: 10px;" @click="deleteCoupon">삭제</button>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';
import SelectUserModal from "@/components/modal/SelectCouponUserModal.vue";
import CouponDetailModal from '@/components/modal/CouponDetailModal.vue';
export default {
    components: {
        PaginationComponent,
        SelectUserModal,
        CouponDetailModal,
    },
    data(){
        return{
            couponList: [],
            selectedCoupons: {},
            selectedCouponDetailsId: '',
            searchName: '',
            searchCode: '',
            searchStartDate: '',
            searchEndDate: '',
            searchCouponStatus: '',
            pageSizeOptions: [10, 25, 50, 100],
            pageSize: 10,
            currentPage: 0,
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            totalPageCount: 0,
            isModalSelectUserOpen: false,
            isModalCouponDetailOpen: false,
            isAllSelected: false, // 전체 선택 체크박스 상태 추가
        }
    },
    created(){
        this.loadCoupons();
    },
    methods:{
        async loadCoupons(){
            try{
                const params = {
                page: this.currentPage,
                size: this.pageSize,
                }
                console.log("search 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const data = {
                        name: this.searchName,
                        code: this.searchCode,
                        startDate: this.searchStartDate,
                        endDate: this.searchEndDate,    
                        couponStatus: this.searchCouponStatus,
                    };
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/search`, data, { headers, params });
                this.couponList = response.data.result.data.content;
                this.totalPageCount = response.data.result.data.totalPages;
                console.log(response);
            }catch(error){
                console.log(error);
            }
        },
        searchCoupons(){
            this.couponList = [];
            this.totalPageCount = '';
            this.loadCoupons();
        },
        changePage(pageNum) {
            this.currentPage = pageNum;
            this.loadCoupons();
        },
        changePageSize(event) {
            this.pageSize = parseInt(event.target.value);
            this.loadCoupons();
        },
        openSelectUserModal() {
            console.log(this.selectedCoupons);
            if (Object.keys(this.selectedCoupons).length === 0) {
                alert("쿠폰을 선택하세요");
                return;
            }
            this.isModalSelectUserOpen = true;
            console.log("List에서 클릭하면 열리는지 여부: ",this.isModalSelectUserOpen);
        },
        closeSelectUserModal() {
            this.isModalSelectUserOpen = false;
            console.log(this.isModalSelectUserOpen);
        },

        openCouponDetailModal(id) {
            this.selectedCouponDetailsId = id;
            console.log("넘기는 id 값 : " + id);
            this.isModalCouponDetailOpen = true;
            console.log("List에서 클릭하면 열리는지 여부: ", this.isModalCouponDetailOpen);
        },
        closeCouponDetailModal() {
            this.isModalCouponDetailOpen = false;
            console.log(this.isModalCouponDetailOpen);
        },
        async publishCoupon() {
            console.log(this.selectedCoupons);
            if (Object.keys(this.selectedCoupons).length === 0) {
                alert("쿠폰을 선택하세요");
                return;
            }
            try {
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                
                for (const couponId of Object.keys(this.selectedCoupons)) {
                    try {
                        await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/publish`, {}, { headers });
                        // 추후에는 쿠폰을 받을 사람들의 접속된 토큰을 가져와서 해당 기기에 알람 전송
                        // 일단은 
                        this.isModalOpen = false;
                    } catch (error) {
                        console.error(`쿠폰 발행 중 오류 발생 (쿠폰 ID: ${couponId})`, error);
                        throw new Error('쿠폰 발행 중 오류 발생');
                    }
                }
                console.log('선택한 쿠폰이 성공적으로 발행되었습니다.');
                alert("쿠폰 발행 성공")
                this.selectedCoupons = {};
                window.location.reload();
            } catch (error) {
                this.selectedCoupons = {};
                console.error('쿠폰 발행 중 오류 발생', error);
                alert("발행 불가능한 쿠폰 입니다.")
            }
        },
        async deleteCoupon() {
            try {
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                
                for (const couponId of Object.keys(this.selectedCoupons)) {
                    try {
                        await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/delete`, {}, { headers });
                    } catch (error) {
                        console.error(`쿠폰 삭재 중 오류 발생 (쿠폰 ID: ${couponId})`, error);
                        alert(`쿠폰 삭재 중 오류 발생 (쿠폰 ID: ${couponId})`)
                        throw new Error('쿠폰 발행 중 오류 발생');
                    }
                }

                console.log('선택한 쿠폰이 성공적으로 삭제되었습니다.');
                alert("쿠폰 삭제 성공")
                window.location.reload();
            } catch (error) {
                console.error('쿠폰 삭제 중 오류 발생', error);
                alert("삭제 불가능한 쿠폰 입니다.")
            }
        },
        resetInputs() {
            this.searchName = null;
            this.searchCode = null;
            this.searchStartDate = null;
            this.searchEndDate = null;
            this.searchCouponStatus = null;
            this.searchCoupons();
        },
        selectAllCoupons() {
            this.isAllSelected = !this.isAllSelected;
            this.couponList.forEach(coupon => {
                this.selectedCoupons[coupon.id] = this.isAllSelected;
            });
        },
        // 개별 쿠폰 체크박스 클릭 시 선택된 쿠폰 목록을 업데이트하는 메서드
        updateSelectedCoupons(couponId) {
            this.selectedCoupons[couponId] = !this.selectedCoupons[couponId];
        },
    },
}
</script>

<style scoped>
.btn {
    cursor: pointer;
    background-color: #f5a742;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;

  }
  
  .btn:hover {
    background-color: #e69500;
  }


</style>
