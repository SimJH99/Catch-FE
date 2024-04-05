<template>
    <div class="min-h-screen flex flex-col items-center">
        <div class="container border-4">
            CouponList
        </div>
        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px; border-bottom: 1px solid #ccc;">
            <table class="table border-gray-200 border-2" style="width: calc(100% - 20px); margin: 10px;"> 
                <tbody>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;" >쿠폰명</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="textInput" name="textInput" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> <!-- 너비 조정 -->
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">쿠폰코드</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <input type="text" id="textInput" name="textInput" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="startDate" v-model="startDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <input type="time" id="startTime" v-model="startTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">마감일</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="endDate" v-model="endDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                                <input type="time" id="endTime" v-model="endTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border border-gray-300" style="background-color: #F5A742; width: 20%; color: white;">쿠폰 상태</th>
                        <td class="px-4 border border-gray-300" style="width: 80%;">
                            <select id="mealType" v-model="selectedMealType">
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
            <button class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 200px); margin-bottom: 10px;">검색</button>
        </div>

        
        <div class="container mb-4" style="width: calc(100% - 40px); margin: 10px;">
            <table class="divide-y divide-gray-200" style="width: calc(100% - 20px); margin: 10px;" >
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            쿠폰명</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            쿠폰 코드</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            시작일</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            마감일</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="coupon in couponList" :key="coupon.id">
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.name}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.code}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.startDate}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{coupon.endDate}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between" style="width: calc(100% - 20px); margin: 10px;">
                <!-- <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 440px);">발행</button> -->
                <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 220px);">삭제</button>
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
        }
    },
    created(){
        this.loadCoupons();
    },
    mounted(){
        window.addEventListener('scroll', this.scrollPagination);
    },
    methods:{
        async loadCoupons(){
            this.isLoading = true;
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
        }
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>