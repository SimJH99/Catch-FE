<template>
    <div class="min-h-screen flex items-center justify-center" style="margin-top: -50px;">
        <div class="container mb-4 border border-gray-300 bg-white" style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
            <div class="text-white font-bold text-center mb-4" style="color: #F5A742; font-size: 3rem; margin-top: 10px; margin-bottom: 10px;">쿠폰 생성</div>
            <table class="table border border-gray-300" style="width: calc(100% - 40px); margin: 10px;">
                <tbody>
                    <tr style="border-bottom: 1px solid white; margin-bottom: 0.5rem;">
                        <th class="py-2" style="background-color: #F5A742; width: 20%; color: white;">쿠폰명</th>
                        <td class="px-4" style="width: 80%;">
                           <input type="text" id="name" name="name" v-model="name" class="mt-1 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-transparent focus:border-gray-300" style="background-color: #DDDDDD; height: 2rem;">
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid white; margin-bottom: 0.5rem;">
                        <th class="py-2" style="background-color: #F5A742; width: 20%; color: white;">수량</th>
                        <td class="px-4" style="width: 80%;">
                            <input type="text" id="quantity" name="quantity" v-model="quantity" class="mt-1 block w-48 px-3 py-1.5 rounded-md border-gray-300 shadow-sm sm:text-sm" style="background-color: #DDDDDD; height: 2rem;">
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid white;">
                        <th class="py-2" style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
                        <td class="px-4" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="startDate" v-model="startDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md" style="background-color: #DDDDDD; height: 2rem; font-size: 16px; text-align:center;">
                                <!-- <input type="time" id="startTime" v-model="startTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> -->
                            </div>
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid white;">
                        <th class="py-2" style="background-color: #F5A742; width: 20%; color: white;">마감일</th>
                        <td class="px-4" style="width: 80%;">
                            <div class="flex">
                                <input type="date" id="endDate" v-model="endDate" class="mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md" style="background-color: #DDDDDD; height: 2rem; font-size: 16px; text-align:center;">
                                <!-- <input type="time" id="endTime" v-model="endTime" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm sm:text-sm border-gray-300 rounded-md"> -->
                            </div>
                        </td>
                    </tr>                    
                    <tr>
                        <td colspan="2" class="px-4 py-2 text-right">
                            <button @click="couponCreate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; background-color: #F5A742;">생성</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            name: '',
            quantity: '',
            startDate: '',
            // startTime: '',
            endDate: '',
            // endTime: '',
        }
    },
    methods: {
        async couponCreate(){
            try{
                const access_token = localStorage.getItem('access_token');
                const headers = access_token ? { Authorization: `Bearer ${access_token}`} : {};
                // const startIsoDateTime = `${this.startDate}T${this.startTime}:00`;
                // const endIsoDateTime = `${this.startDate}T${this.startTime}:00`;
                const data = {
                    name: this.name,
                    quantity: this.quantity,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    // 다른 필드들...
                };
                console.log(data);
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/coupon/create`, data ,{headers});
            }catch(error){
                console.log(error);
            }
            this.$router.push("/couponList");
        },
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>