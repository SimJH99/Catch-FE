<template>
    <div class="m-3 bg-white">
        <div class="text-4xl p-2 m-3 font-bold">문의하기</div>
        <div class="p-3">
            <form class="" @submit.prevent="createComplaint" enctype="multipart/form-data">
            <table class="table w-full"> 
                    <tbody>
                        <tr>
                            <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">제목</th>
                            <td class="px-2 border-t border-b border-black">
                                <input type="text" v-model="title" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base"> <!-- 너비 조정 -->
                            </td>
                        </tr>
                        <tr>
                            <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">문의 유형</th>
                            <td class="px-2 border-t border-b border-black">
                                <div class="w-full">
                                    <div class="grid grid-cols-3 ">
                                    <div class="inline-block radio">
                                        <input type="radio" v-model="category" id="delivery" hidden="hidden" value="DELIVERY"/>
                                        <label for="delivery" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md h-5 lg:w-32 lg:h-10">
                                        배송
                                        </label>
                                    </div>
                                    <div class="inline-block radio">
                                        <input type="radio" v-model="category" id="order" hidden="hidden" value="ORDER"/>
                                        <label for="order" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md h-5 lg:w-32 lg:h-10">
                                        주문/결제
                                        </label>
                                    </div>
                                    <div class="inline-block radio">
                                        <input type="radio" v-model="category" id="cancel/exchange/refund" hidden="hidden" value="CANCEL/EXCHANGE/REFUND"/>
                                        <label for="cancel/exchange/refund" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md h-5 lg:w-32 lg:h-10">
                                        취소/교환/환불
                                        </label>
                                    </div>
                                    <div class="inline-block radio">
                                        <input type="radio" v-model="category" id="myinfo" hidden="hidden" value="MYINFO"/>
                                        <label for="myinfo" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md w-10 h-5 lg:w-32 lg:h-10">
                                        회원정보
                                        </label>
                                    </div>
                                    <div class="inline-block radio">
                                        <input type="radio" v-model="category" id="confirmation" hidden="hidden" value="CONFIRMATION"/>
                                        <label for="confirmation" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md w-10 h-5 lg:w-32 lg:h-10">
                                        상품확인
                                        </label>
                                    </div>
                                    <div class="inline-block radio">
                                        <input type="radio" v-model="category" id="service" hidden="hidden" value="SERVICE"/>
                                        <label for="service" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md w-10 h-5 lg:w-32 lg:h-10">
                                        서비스
                                        </label>
                                    </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">내용</th>
                            <td class="px-2 py-2 border-t border-b border-black">
                                <textarea v-model="contents" class="w-full outline-none" cols="30" rows="20"></textarea>
                        </td>
                        </tr>
                        <tr>
                            <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">사진</th>
                            <td class="px-2 border-t border-b border-black">
                                <div class="flex flex-row flex-wrap">
                                    <div v-for="image in ImageList" :key="image.files" class="mt-2 max-w-[100px] max-h-[100px] rounded-md flex-shrink-0">
                                        <img :src="image" alt="선택된 이미지" class="w-full h-full object-cover aspect-w-1 aspect-h-1">
                                    </div>
                                </div>
                                <input type="file" multiple @change="handleImageUpload" accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG" class="mt-1 p-3 border rounded-md w-full">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div colspan="2" class="px-1 py-3 text-right">
                    <button type="submit" class="bg-orange-400 hover:bg-orange-400 text-white font-bol py-3 px-6 rounded" style="width: 200px; text-align: center; background-color: #F5A742;">작성</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "@/axios/index";
export default {
    data() {
        return{
            complaintImage: [],
            ImageList: [],
            title: '',
            category: '',
            contents: '',
        }
    },
    methods: {
        handleImageUpload(event) {
            this.ImageList = [];
            this.complaintImage = event.target.files;
            if(this.complaintImage.length > 2){
                alert("사진은 2장까지만 업로드 할 수 있습니다.");
                event.target.value = null;
            } else{
                for(var i = 0; i < this.complaintImage.length; i++){
                    if (this.complaintImage[i]) {
                        this.ImageList.push(URL.createObjectURL(this.complaintImage[i]));
                    }
                }
            }
        },
        async createComplaint() {
            try {
                if (!this.title) {
                    alert("제목을 입력하세요.")
                } else if (!this.category) {
                    alert("카테고리를 선택하세요.")
                } else if (!this.contents) {
                    alert("내용을 입력하세요.")
                } else {
                    const registerData = new FormData();
                    registerData.append("title", this.title);
                    registerData.append("category", this.category);
                    registerData.append("contents", this.contents);
                    if (this.complaintImage) {
                        for(var i = 0; i < this.complaintImage.length; i++){
                            if (this.complaintImage[i]) {
                                registerData.append("images", this.complaintImage[i]);
                            }
                        }
                    }

                    let headers = {
                        'Content-Type': 'multipart/form-data'
                    };
                    
                    const access_token = localStorage.getItem('access_token');
                    headers.Authorization = `Bearer ${access_token}`;

                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/create`, registerData, { headers });
                    alert("등록 완료");
                    this.$router.push({ name: 'MyComplaintList' });
                }
            } catch (error) {
                    alert(error.message);
            }
        },       
    }
}
</script>

<style>
.radio input ~ label {
  background-color: #F5F5F5;
  color: black;
}
.radio input:checked ~ label {
  background-color: #FCA863;
  color: white;
}
</style>