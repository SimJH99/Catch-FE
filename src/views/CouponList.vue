<template>
    <div class="min-h-screen flex flex-col items-center">
        <div class="container border-4">
            CouponList
        </div>
        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px; border-bottom: 1px solid #ccc;">
            <table class="table border-gray-200 border-2" style="width: calc(100%); margin: 10px;"> 
                <tbody>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;" >쿠폰명</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="searchName" v-model="searchName" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> <!-- 너비 조정 -->
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">쿠폰코드</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="searchCode" v-model="searchCode" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchStartDate" v-model="searchStartDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <!-- <input type="time" id="searchStartTime" v-model="searchStartTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> -->
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">마감일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchEndDate" v-model="searchEndDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <!-- <input type="time" id="searchEndTime" v-model="searchEndTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> -->
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">쿠폰 상태</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <select id="searchCouponStatus" v-model="searchCouponStatus">
                              <option value="발급">발급</option>
                              <option value="삭제">삭제</option>
                              <option value="발행">발행</option>
                              <option value="만료">만료</option>
                              <option value="수령">수령</option>
                              <option value="사용된">사용된</option>
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
                                <input id="selectAllCheckbox" type="checkbox" />
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
                            <input type="checkbox" v-model="selectedCoupons[coupon.id]">
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
                        <td class="px-6 py-4 whitespace-nowrap"><button @click.stop="updateCoupon(coupon.id)" class="btn btn-success">수정</button></td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-between" style="width: calc(100% - 20px); margin: 10px;">
                <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 400px);" @click="openSelectUserModal">발행</button>
                <SelectUserModal :isModalSelectUserOpen="isModalSelectUserOpen" :selectedCoupons="selectedCoupons" @close-modal="isModalSelectUserOpen = false"/>
                <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: 10px;" @click="deleteCoupon">삭제</button>
            </div>
        </div>

        <!-- 페이지네이션 컴포넌트 추가 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage" />
        
    </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';
import SelectUserModal from "@/components/modal/SelectUserModal.vue";
export default {
    components: {
        PaginationComponent,
        SelectUserModal
    },
    data(){
        return{
            couponList: [],
            selectedCoupons: [],
            searchName: '',
            searchCode: '',
            searchStartDate: '',
            searchEndDate: '',
            searchCouponStatus: '',

            pageSize: 2,
            currentPage: 0,
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            totalPageCount: 0,

            isModalSelectUserOpen: false,

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
                console.log("data 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/list`, { headers, params });
                this.couponList = response.data.result.data;
                this.totalPageCount = response.data.result.totalPage;
                console.log(this.couponList);
                console.log(this.totalPageCount);
            }catch(error){
                console.log(error);
            }
        },
        async searchCoupons(){
            try{
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
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/search`, data ,{headers});
                this.couponList = response.data.result.data;
                this.totalPageCount = response.data.result.totalPage;
                console.log(this.couponList);
            }catch(error){
                console.log(error);
            }
        },
        changePage(pageNum) {
            this.currentPage = pageNum;
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


        // async updateCoupon(couponId){
        //     if(confirm("수정된 내용을 저장하시겠습니까?")){
        //         try{
        //             const access_token = localStorage.getItem('access_token');
        //             const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
        //             const startIsoDateTime = `${this.startDate}T${this.startTime}:00`;
        //             const endIsoDateTime = `${this.startDate}T${this.startTime}:00`;
        //             const data = {
        //                 name: this.name,
        //                 quantity: this.quantity,
        //                 startDate: startIsoDateTime,
        //                 endDate: endIsoDateTime
        //                 // 다른 필드들...
        //             };
        //             console.log(couponId);
        //             console.log(data);
        //             await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/update`, data , {headers})
        //             alert("쿠폰 수정 완료");
        //             window.location.reload();
        //         }catch(error){
        //             console(error);
        //             alert("쿠폰 수정 실패");
        //         }
        //     }
        // },
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
    },
}
</script>

<style lang="scss" scoped>

</style>
