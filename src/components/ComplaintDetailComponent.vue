<template>
    <div>
        <table class="table w-full"> 
            <tbody>
                <tr>
                    <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans w-154.547px">제목</th>
                    <td class="px-2 border-t border-b border-black">
                        <input type="text" v-model="complaint.title" class="w-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent shadow-sm text-base" :readonly="!editable"> <!-- 너비 조정 -->
                    </td>
                </tr>
                <tr>
                    <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">문의 유형</th>
                    <td class="px-2 border-t border-b border-black">
                        <div class="w-full">
                            <div class="grid grid-cols-3 ">
                                <div class="inline-block radio" v-for="(item, index) in categories" :key="index">
                                    <input type="radio" :id="item.id" :value="item.value" hidden  v-model="complaint.category" :disabled="!editable">
                                    <label :for="item.id" class="m-2 px-2 py-1 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md h-5 lg:w-32 lg:h-10">{{ item.label }}</label>
                                </div>
                            </div>
                        </div>
                        
                    </td>
                </tr>
                <tr>
                    <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">내용</th>
                    <td class="px-2 py-2 border-t border-b border-black">
                        <textarea v-model="complaint.contents" class="w-full outline-none" cols="30" rows="20" :readonly="!editable"></textarea>
                    </td>
                </tr>
                <tr>
                    <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">사진</th>
                    <td class="px-2 border-t border-b border-black">
                        <div class="flex flex-row flex-wrap p-2 h-auto">
                            <img :src="urls[0]" alt="선택된 이미지" class="p-2 max-w-[100px] max-h-[100px] w-full h-full object-cover aspect-w-1 aspect-h-1">
                            <div class="relative">
                                <button v-if="deletebutton1" @click="removeImage1" class="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full">X</button>
                                <input type="file" id="uploadImg" ref="fileInput" @change="handleFileChange1" hidden accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG">
                                <button v-if="editbutton1" @click="uploadImage1" :for="uploadimg" class="absolute top-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full">+</button>
                            </div>
                            <img :src="urls[1]" alt="선택된 이미지" class="p-2 max-w-[100px] max-h-[100px] w-full h-full object-cover aspect-w-1 aspect-h-1">
                            <div class="relative">
                                <button v-if="deletebutton2" @click="removeImage2" class="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full">X</button>
                                <input type="file" id="uploadImg" ref="fileInput" @change="handleFileChange2" hidden accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG">
                                <button v-if="editbutton2" @click="uploadImage2" :for="uploadimg" class="absolute top-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full">+</button>
                            </div>  
                        </div>
                    </td>
                </tr>
                <tr v-if="!disableButton">
                    <th class="py-2 border-t border-b border-r border-black text-black font-bold bg-white text-xl text-center font-sans">답변</th>
                    <td class="px-2 border-t border-b border-black">
                        <textarea v-model="comment" class="w-full" cols="30" rows="10" :readonly="!editable"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="disableButton" class="flex justify-end">
            <div colspan="2" class="px-1 py-3 text-right">
                <button v-if="!editable" @click="toggleInputs" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 150px; background-color: #F5A742;">수정</button>
            </div>
            <div colspan="2" class="px-1 py-3 text-right">
                <button v-if="!editable" @click="deleteComplaint" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 150px; background-color: #F5A742;">삭제</button>
            </div>
            <div colspan="2" class="px-1 py-3 text-right">
                <button v-if="editable" @click="cancelUpdate" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 150px; background-color: #F5A742;">수정 취소</button>
            </div>
            <div colspan="2" class="px-1 py-3 text-right">
                <button v-if="editable" @click="updateComplaint" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 150px; background-color: #F5A742;">수정 완료</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/axios/index";
import no_images from '@/assets/images/no_image.png'
export default {
    data() {
    return {
      complaintId: null,
      complaint: {},
      ImageList: [],
      keys: [],
      urls: [],
      disableButton: true,
      editable: false,
      deletebutton1: false,
      editbutton1: false,
      deletebutton2: false,
      editbutton2: false,
      uploadImage:'',
      comment: '',
      categories: [
                { id: 'delivery', value: 'DELIVERY', label: '배송' },
                { id: 'order', value: 'ORDER', label: '주문/결제' },
                { id: 'cancel/exchange/refund', value: 'CANCEL/EXCHANGE/REFUND', label: '취소/교환/환불' },
                { id: 'myinfo', value: 'MYINFO', label: '회원정보' },
                { id: 'confirmation', value: 'CONFIRMATION', label: '상품확인' },
                { id: 'service', value: 'SERVICE', label: '서비스' }
            ]
    };
  },
  created(){
    this.complaintId = this.$route.params.complaintId;
    this.loadComplaint();
  },
  mounted() {
    
  },
  methods: {
    async loadComplaint() {
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.complaintId}/detail`, {headers});
        this.complaint = response.data.result.data;

        // s3Urls 객체의 각 키-값 쌍에 대해 반복하여 처리
        for (const [key, value] of Object.entries(this.complaint.s3Urls)) {
              this.keys.push(key);
              this.urls.push(value);
          }
    
        // 이미지 없음 처리
        if(this.urls.length < 2){
            for(var i = this.urls.length; i < 2; i++){
                this.urls[i] = no_images;
            }
        }

        if(this.complaint.status == 'REPLY'){
            this.replyButton();
            this.loadComment();
        }
    },
    async updateComplaint(){
        if(window.confirm("게시글을 수정 하시겠습니까?")){
            const token = localStorage.getItem('access_token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const registerData = {title: this.complaint.title, category: this.complaint.category, contents: this.complaint.contents, };
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.complaintId}/update`, registerData, {headers});
            alert("수정완료.");
            location.reload(true);
        }
    },
    async deleteComplaint() {
        if(window.confirm("게시글을 삭제 하시겠습니까?")){
            if(window.confirm("삭제 시 복구 할 수 없습니다. 삭제하시겠습니까?")){
                try{
                    const token = localStorage.getItem('access_token');
                    const headers = token ? { Authorization: `Bearer ${token}` } : {};
                    await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.complaintId}/delete`, {headers});
                    alert("삭제되었습니다.");
                    this.$router.push({ name: 'MyComplaintList' });
                }
                catch(error){
                    console.log(error)
                }
            }
        }
    },
    toggleInputs() {
        // 버튼 클릭시 입력 가능 여부를 토글
        this.editable = !this.editable;
        if(this.urls[0] == no_images){
            this.editbutton1 = true;
            this.deletebutton1= false;
        } else{
            this.editbutton1 = false;
            this.deletebutton1= true;
        }

        if(this.urls[1] == no_images){
            this.editbutton2 = true;
            this.deletebutton2= false;
        } else{
            this.editbutton2 = false;
            this.deletebutton2= true;
        }
    },
    cancelUpdate() {
        location.reload(true);
    },
    async handleFileChange1(event) {
        try{
            const selectedFile = event.target.files[0];
            const registerData = new FormData();
            registerData.append("image", selectedFile);
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            
            const access_token = localStorage.getItem('access_token');
            headers.Authorization = `Bearer ${access_token}`;

            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.complaintId}/add/image`, registerData, { headers });
            alert("등록 완료");
            location.reload(true);
        }
        catch(error){
            console.log(error)
        }
    },
    async handleFileChange2(event) {
        try{
            const selectedFile = event.target.files[0];
            const registerData = new FormData();
            registerData.append("image", selectedFile);
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            
            const access_token = localStorage.getItem('access_token');
            headers.Authorization = `Bearer ${access_token}`;

            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.complaintId}/add/image`, registerData, { headers });
            alert("등록 완료");
            location.reload(true);
        }
        catch(error){
            console.log(error.message);
        }
    },
    uploadImage1() {
        if(window.confirm("사진을 등록 하시겠습니까?")){
            const fileInput = this.$refs.fileInput;
            fileInput.click();
        }
    },
    uploadImage2() {
        if(window.confirm("사진을 등록 하시겠습니까?")){
            const fileInput = this.$refs.fileInput;
            fileInput.click();
        }
    },
    async removeImage1() {
        if(window.confirm("사진을 삭제 하겠습니까?")){
            const token = localStorage.getItem('access_token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.keys[0]}/delete/image`, {headers});
            alert("삭제되었습니다.")
            location.reload(true);
        }
    },
    async removeImage2() {
        if(window.confirm("사진을 삭제 하겠습니까?")){
            const token = localStorage.getItem('access_token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/complaints/${this.keys[1]}/delete/image`, {headers});
            alert("삭제되었습니다.")
            location.reload(true);
        }
    },
    replyButton(){
        this.disableButton = false;
    },
    async loadComment(){
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/comments/${this.complaintId}/detail`, {headers});
        this.comment = response.data.result.data.comment;
    },
  },
};

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