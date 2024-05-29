<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalComplaintDetailOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-header relative">
        <h2 style="font-size: 24px; font-weight: bold; color:#EFEFEF">1:1 문의</h2>
        <span class="close absolute" @click="closeComplaintDetailModal(selectedComplaintId)">&times;</span>
      </div>
        <div v-if="loading" class="loading-text">
          로딩 중...
        </div>

        <div class="modal-body shadow-md">
          <div class="user-info ">
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">제목</h3>
              <div class="table-label mt-3" style="font-size: 15px;">{{ complaint.title }}</div>
          </div>
        </div>
        
        <div class="modal-body shadow-md my-2">
          <h3 style="font-size: 20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">카테고리</h3>
          <div class="grid grid-cols-3 ">
            <div class="inline-block radio" v-for="(item, index) in categories" :key="index">
              <input type="radio" :id="item.id" :value="item.value" hidden  v-model="complaint.category" disabled>
              <label :for="item.id" class="m-2 rounded-lg flex justify-center items-center font-bold text-sm lg:text-md h-5 lg:w-32 lg:h-10">{{ item.label }}</label>
            </div>
          </div>
        </div>
        <div class="modal-body shadow-md my-2">
          <h3 style="font-size: 20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">본문</h3>
          <textarea v-model="complaint.contents" class="w-full outline-none" rows="5" readonly></textarea>
        </div>
        <div class="modal-body shadow-md my-2">
          <h3 style="font-size: 20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">사진</h3>
          <div class="rounded-table">
            <div class="flex flex-row flex-wrap p-2 h-auto">
              <div v-for="image in urls" :key="image" class="mt-2 max-w-[100px] max-h-[100px] rounded-md flex-shrink-0">
                <img :src="image" alt="선택된 이미지" @click="openImageDetailModal(image)" style="cursor: pointer;" class="w-full h-full object-cover aspect-w-1 aspect-h-1 p-1">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body shadow-md mt-2">
          <h3 style="font-size: 20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">답변</h3>
          <textarea v-model="comment" class="w-full outline-none" rows="10" placeholder="답변을 입력하세요." :readonly="isEditing"></textarea>
        </div>
        <div class="modal-body flex justify-end">
          <button v-if="!isEditing && !isReply" @click="createComment(selectedComplaintId)" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 100px; background-color: #F5A742;">답변완료</button>
          <div v-if="isUpdating" class="flex justify-end">
            <button @click="isEdit" class="hover:bg-orange-600 text-white py-3 px-6 rounded mr-3" style="width: 100px; background-color: #F5A742;">수정</button>
            <button @click="deleteComment(selectedComplaintId)" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 100px; background-color: #F5A742;">삭제</button>
          </div>
          <button v-if="!isUpdating && click" @click="updateComment(selectedComplaintId)" class="hover:bg-orange-600 text-white py-3 px-6 rounded" style="width: 100px; background-color: #F5A742;">수정완료</button>
        </div>
        <div class="modal-content" @click.stop>
          <div class="modal-inner">
            <ImageModal :isModalImageDetailOpen="isModalImageDetailOpen" :selectedImageUrl="selectedImageUrl" @close-modal="isModalImageDetailOpen = false" />
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import axios from "@/axios/index";
import no_images from '@/assets/images/no_image.png'
import ImageModal from '@/components/modal/ImageModal.vue';
export default {
  components: {
    ImageModal
  },
  props: ['selectedComplaintId', 'isModalComplaintDetailOpen'],
  data() {
    return {
      isModalOpen: false,
      currentModalComponent: null,
      complaint: {},
      comment: {},
      userEmployeeNumber:'',
      adminEmployeeNumber: '',
      keys: [],
      urls: [],
      isEditing: false,
      isReply: false,
      isUpdating: false,
      click: false,
      categories: [
                { id: 'delivery', value: 'DELIVERY', label: '배송' },
                { id: 'order', value: 'ORDER', label: '주문/결제' },
                { id: 'cancel/exchange/refund', value: 'CANCEL/EXCHANGE/REFUND', label: '취소/교환/환불' },
                { id: 'myinfo', value: 'MYINFO', label: '회원정보' },
                { id: 'confirmation', value: 'CONFIRMATION', label: '상품확인' },
                { id: 'service', value: 'SERVICE', label: '서비스' }
      ],
      selectedImageUrl: '',
      isModalImageDetailOpen: false,
    };
  },
  watch: {
    selectedComplaintId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadComplaint(newVal);
        }
      }
    }
  },
  methods: {
    closeComplaintDetailModal(selectedComplaintId) {
      this.loadComplaint(selectedComplaintId);
      this.$emit('close-modal');
    },
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$refs.modalContainer) {
        this.closeModal();
      }
    },
    async loadComment(selectedComplaintId){
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const commentResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/comments/${selectedComplaintId}/detail`, {headers});
      this.comment = commentResponse.data.result.data.comment;
      this.adminEmployeeNumber = commentResponse.data.result.data.adminEmployeeNumber;

      if (token) {
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        this.userEmployeeNumber = payload.sub.split(':')[0];
      }
      if(this.userEmployeeNumber == this.adminEmployeeNumber){
        this.isUpdating = true;
      }
    },
    async loadComplaint(selectedComplaintId) {
        this.keys = [],
        this.isEditing= false,
        this.isUpdating= false,
        this.urls = [];
        this.comment = '';
        this.adminEmployeeNumber = '';
        this.complaint = {};
        this.click = false;
        this.isReply = false;

        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/${selectedComplaintId}/detail`, {headers});
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
          this.isEditing = true;
          this.isReply = true;
          this.loadComment(selectedComplaintId);
        }
        else{
          this.comment = null;
        }
    },
    async createComment(selectedComplaintId){
      try{
        if (!this.comment) {
          alert("답변을 입력하세요")
        }
        else{
          if(window.confirm("답변을 완료하시겠습니까?")){
            const token = localStorage.getItem('access_token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const registerData = {comment: this.comment};
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/comments/${selectedComplaintId}/create`, registerData, {headers});
            alert("답변이 완료되었습니다.");
            this.loadComplaint(selectedComplaintId);
          }
          else{
            alert("답변이 취소되었습니다.");
          }
        }
      }
      catch(error){
        console.log(error);
      }
    },
    async updateComment(selectedComplaintId){
      try{
        if (!this.comment) {
          alert("답변을 입력하세요")
        }
        else{
          if(window.confirm("답변을 수정하시겠습니까?")){
            const token = localStorage.getItem('access_token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const registerData = {comment: this.comment};
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/comments/${selectedComplaintId}/update`, registerData, {headers});
            alert("답변이 완료되었습니다.");
            this.loadComplaint(selectedComplaintId);
          }
          else{
            alert("답변이 취소되었습니다.");
          }
        }
      }
      catch(error) {
        console(error);
      }
    },
    async deleteComment(selectedComplaintId){
      if(window.confirm("답변을 삭제 하시겠습니까?")){
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/comments/${selectedComplaintId}/delete`, {headers});
        this.loadComplaint(selectedComplaintId);
        alert("삭제되었습니다.");
        window.location.reload();
      }
      else{
        alert("취소되었습니다.");
      }
    },
    isEdit(){
      if(window.confirm("답변을 수정하시겠습니까?")){
        this.click = true;
        this.isUpdating = false;
        this.isEditing = false;
      }
    },
    // 모달 열기
    openImageDetailModal(url) {
      this.selectedImageUrl = url;
      this.isModalImageDetailOpen = true;
    },
    closeImageDetailModal() {
      this.isModalImageDetailOpen = false;
      console.log(this.isModalImageDetailOpen);
    },
  },
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
  background: #F3F4F6;
  width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-title {
  margin: 0;
}

.modal-body {
    padding: 20px;
    background-color: white;
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
