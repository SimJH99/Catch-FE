<!-- ModalComponent.vue -->
<template>
  <div v-if="isModalOpen" class="modal-container" ref="modalContainer" @click="handleModalClick">
    <div class="modal-content" @click.stop>
      <div class="modal-inner">
        <component :is="currentModalComponent" @closeModal="closeModal" />
      </div>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isModalOpen: false,
      currentModalComponent: null,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      this.currentModalComponent = SignupComponent;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentModalComponent = null;
    },
    handleModalClick(event) {
      // 모달 배경 클릭 시 모달 닫기
      if (event.target === this.$refs.modalContainer) {
        this.closeModal();
      }
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
  background: white;
  width: 400px;
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
}

button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
