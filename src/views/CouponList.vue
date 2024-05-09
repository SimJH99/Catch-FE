<template>
    <div class="">
        <div class="mx-3 mt-3 p-1 bg-white rounded-md shadow-md">
            <div class="text-4xl font-bold p-3 border-gray-300"> 쿠폰 관리 </div>
        </div>
        
        <div class="m-2 grid grid-cols-3">
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">생성한 쿠폰</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              </div>
                <div class="m-5 text-4xl font-bold text-center">{{this.issuanceInfo}}장</div>
            </div>

            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
                <div class="flex">
                  <div class="text-xl font-bold text-gray-500 mr-2">배포 중인 쿠폰</div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                </div>
                  <div class="m-5 text-4xl font-bold text-center">{{this.publicInfo}}장</div>
              </div>
      
            <div class="bg-white m-2 p-2 rounded-md py-5 px-4 shadow-md">
              <div class="flex">
                <div class="text-xl font-bold text-gray-500 mr-2">만료 임박 쿠폰</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
                <div class="m-5 text-4xl font-bold text-center">{{this.expirationInfo}}장</div>
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
                              <option value="생성">생성</option>
                              <option value="배포">배포</option>
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
                            통계 / 수정
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
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span v-if="coupon.status === 'ISSUANCE'">생성</span>
                            <span v-else-if="coupon.status === 'DELETE'">삭제</span>
                            <span v-else-if="coupon.status === 'PUBLISH'">배포</span>
                            <span v-else-if="coupon.status === 'EXPIRATION'">만료</span>
                            <span v-else-if="coupon.status === 'RECEIVE'">수령</span>
                            <span v-else-if="coupon.status === 'USED'">사용된</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap" >{{coupon.quantity}}</td>
                        <td class="px-6 py-4 whitespace-nowrap" >{{coupon.startDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap" >{{coupon.endDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <!-- 통계 버튼 -->
                            <button @click.stop="openCouponChartModal(coupon.id)" class="btn mr-2">통계</button>
                            <!-- 수정 버튼 -->
                            <button @click.stop="openCouponDetailModal(coupon.id)" class="btn">수정</button>
                        </td>
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
        
        <div class="modal-content" @click.stop>
            <div class="modal-inner">
              <CouponChartModal :isCouponChartModalOpen="isCouponChartModalOpen" :selectedCouponId="selectedCouponId" @close-modal="isCouponChartModalOpen = false" />
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
import CouponChartModal from '@/components/modal/CouponChartModal.vue';
export default {
    components: {
        PaginationComponent,
        SelectUserModal,
        CouponDetailModal,
        CouponChartModal,
    },
    data(){
        return{
            couponList: [],
            selectedCoupons: {},
            selectedCouponDetailsId: '',
            isCouponChartModalOpen: false,
            selectedCouponId: '',
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
            publicInfo: {},
            issuanceInfo: {},
            expirationInfo: {},
        }
    },
    created(){
        this.loadCoupons();
        this.featchCoupon();
    },
    methods:{
        async featchCoupon(){
            try{
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const publishResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/publish/count`, {headers});
                const issuanceResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/issuance/count`, {headers});
                const expirationResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/expiration/count`, {headers});
                this.publicInfo = publishResponse.data.result.data;
                this.issuanceInfo = issuanceResponse.data.result.data;
                this.expirationInfo = expirationResponse.data.result.data;
            }catch(error){
                console.log(error);
            }
        },
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
            // 선택된 쿠폰들의 상태가 모두 "생성"인지 확인하는 변수
            let allCreated = true;

            for (const couponId of Object.keys(this.selectedCoupons)) {
                // 선택된 쿠폰 중에 값이 true인 경우에만 상태를 확인하고, 해당 쿠폰이 "생성" 상태가 아닌 경우에만 allCreated를 false로 설정
                if (this.couponList.find(coupon => coupon.id === parseInt(couponId)).status !== 'ISSUANCE') {
                    allCreated = false;
                    break; // 하나라도 "생성" 상태가 아닌 쿠폰이 있다면 반복문을 더 이상 진행할 필요가 없으므로 중단
                }
            }

            if (Object.keys(this.selectedCoupons).length === 0) {
                alert("쿠폰을 선택하세요");
                return;
            } else if (allCreated) {
                // 모달창 열기
                this.isModalSelectUserOpen = true;
                console.log("List에서 클릭하면 열리는지 여부: ",this.isModalSelectUserOpen);
            } else {
                alert("생성 상태인 쿠폰만 선택하세요");
            }
        },
        closeSelectUserModal() {
            this.isModalSelectUserOpen = false;
            console.log(this.isModalSelectUserOpen);
        },
        openCouponDetailModal(id) {
            if (this.couponList.find(coupon => coupon.id === parseInt(id)).status !== 'ISSUANCE') {
                alert("수정 불가능한 쿠폰입니다.")
            }else{
                this.selectedCouponDetailsId = id;
                console.log("넘기는 id 값 : " + id);
                this.isModalCouponDetailOpen = true;
                console.log("List에서 클릭하면 열리는지 여부: ", this.isModalCouponDetailOpen);
            }
        },
        closeCouponDetailModal() {
            this.isModalCouponDetailOpen = false;
            console.log(this.isModalCouponDetailOpen);
        },
        openCouponChartModal(id) {
            this.selectedCouponId = id;
            this.isCouponChartModalOpen = true;
        },
        closeCouponChartModal() {
            this.isCouponChartModalOpen = false;
            console.log(this.isCouponChartModalOpen);
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
            const access_token = localStorage.getItem('access_token');
            const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
            
            for (const couponId of Object.keys(this.selectedCoupons)) {
                try {
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/delete`, {}, { headers });
                    alert("쿠폰 삭제 성공");
                    window.location.reload();
                } catch (error) {
                    alert(`삭제 불가 쿠폰입니다. (쿠폰명 : ${this.couponList.find(coupon => coupon.id === parseInt(couponId)).name})`);
                }
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
        selectAllCoupons(coupon) {
            const isChecked = coupon.target.checked;
            this.couponList.forEach(coupon => {
                if (isChecked) {
                    // 모든 이벤트를 선택
                    this.selectedCoupons[coupon.id] = true;
                } else {
                    // 모든 이벤트 선택 해제
                    delete this.selectedCoupons[coupon.id];
                }
            });
        },
        updateSelectedCoupons(couponId) {
            // 이벤트 ID가 selectedEvents에 있는지 확인
            if (this.selectedCoupons[couponId]) {
                // 선택된 이벤트가 이미 있는 경우, 해당 이벤트를 제거
                delete this.selectedCoupons[couponId];
            } else {
                // 선택된 이벤트가 없는 경우, 해당 이벤트를 추가
                this.selectedCoupons[couponId] = true;
            }

                // 개별 요소가 체크 해제될 때 전체 선택 체크 박스 상태를 업데이트
                const allChecked = this.couponList.every(coupon => this.selectedCoupons[coupon.id]);
            const selectAllCheckbox = document.getElementById('selectAllCheckbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
            }
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