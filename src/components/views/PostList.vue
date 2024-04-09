<template>
    <div class="m-3 bg-white">
        <div class="text-4xl font-bold p-3 border-b-2 border-gray-300"> 문의 게시글 리스트 </div>
        <div class="container mb-4 border-b-2 border-gray-300" style="width: calc(100% - 40px); margin: 10px;">
            <table class="table border-gray-400 border-2" style="width: calc(100%); margin: 10px;"> 
                <tbody>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;" >게시글 번호</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base"> <!-- 너비 조정 -->
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;">고객 이름</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;">게시글 제목</th>
                        <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                            <input type="text" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base">
                        </td>
                    </tr>
                    <tr>
                        <th class="py-2 border-2 border-orange-400 text-xl" style="background-color: #F5A742; width: 20%; color: white;">답변 여부</th>
                        <td class="px-2 border-2 border-gray-300 " style="width: 80%;">
                            <input type="text" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base">
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
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>