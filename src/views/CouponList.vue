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
                            <input type="text" id="searchName" name="searchName" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> <!-- 너비 조정 -->
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">쿠폰코드</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="searchCode" name="searchCode" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchStartDate" v-model="searchStartDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <input type="time" id="searchStartTime" v-model="searchStartTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">마감일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="searchEndDate" v-model="searchEndDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <input type="time" id="searchEndTime" v-model="searchEndTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">쿠폰 상태</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <select id="searchCouponStatus" v-model="searchCouponStatus">
                              <option value="아침">아침아침</option>
                              <option value="점심">점심</option>
                              <option value="저녁">저녁</option>
                              <option value="간식">간식</option>
                              <option value="야식">야식</option>
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
                            <input type="checkbox" v-model="selectedCoupons[coupon.id]"/>
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
                <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 400px);" @click="publishCoupon">발행</button>
                <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: 10px;" @click="deleteCoupon">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            couponList: [],
            selectedCoupons: [],
            searchName: '',
            searchCode: '',
            searchStartDate: '',
            searchStartTime: '',
            searchEndDate: '',
            searchEndTime: '',
            searchCouponStatus: '',
        }
    },
    created(){
        this.loadCoupons();
    },
    methods:{

        async loadCoupons(){
            try{
                console.log("data 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/list`, {headers});
                this.couponList = response.data.result.data;
                console.log(response);
            }catch(error){
                console.log(error);
            }
        },
        async searchCoupons(){
            try{
                console.log("search 호출");
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                const startIsoDateTime = `${this.searchStartDate}T${this.searchStartTime}:00`;
                const endIsoDateTime = `${this.searchEndDate}T${this.searchEndTime}:00`;
                const data = {
                        name: this.searchName,
                        quantity: this.searchCode,
                        startDate: startIsoDateTime,
                        endDate: endIsoDateTime,
                        status: this.searchCouponStatus,
                        // 다른 필드들...
                    };
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/search`, data ,{headers});
                this.couponList = response.data.result.data;
                console.log(this.couponList);
            }catch(error){
                console.log(error);
            }
        },
        async updateCoupon(couponId){
            if(confirm("수정된 내용을 저장하시겠습니까?")){
                try{
                    const access_token = localStorage.getItem('access_token');
                    const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                    const startIsoDateTime = `${this.startDate}T${this.startTime}:00`;
                    const endIsoDateTime = `${this.startDate}T${this.startTime}:00`;
                    const data = {
                        name: this.name,
                        quantity: this.quantity,
                        startDate: startIsoDateTime,
                        endDate: endIsoDateTime
                        // 다른 필드들...
                    };
                    console.log(couponId);
                    console.log(data);
                    await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/update`, data , {headers})
                    alert("쿠폰 수정 완료");
                    window.location.reload();
                }catch(error){
                    console(error);
                    alert("쿠폰 수정 실패");
                }
            }
        },
        async publishCoupon() {
            try {
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
                
                for (const couponId of Object.keys(this.selectedCoupons)) {
                    try {
                        await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/publish`, {}, { headers });
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

    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
