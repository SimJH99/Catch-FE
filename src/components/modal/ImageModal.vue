<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalImageDetailOpen" class="modal">
    <div class="modal-content" @click.stop>
      <div class="modal-inner relative">
        <img :src="url" alt="선택된 이미지" class="w-full h-full object-cover aspect-w-1 aspect-h-1 p-1">
        <span class="close absolute" @click="closeImageDetailModal()">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['selectedImageUrl', 'isModalImageDetailOpen'],
  data() {
    return {
      isModalOpen: false,
      currentModalComponent: null,
      url: '',
    };
  },
  watch: {
    selectedImageUrl: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadAccountDetails(newVal);
        }
      }
    }
  },
  methods: {
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$refs.modalContainer) {
        this.closeImageDetailModal();
      }
    },
    closeImageDetailModal() {
      this.$emit('close-modal');
    },
    loadAccountDetails(selectedImageUrl){
      this.url = selectedImageUrl;
    }
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
