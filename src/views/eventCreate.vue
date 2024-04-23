<template>
    <div class="container">
      <!-- 이벤트 제목 입력과 HTML 코드 입력, 미리보기 -->
      <div class="container mb-4 border border-gray-300 bg-white" style="min-width: 800px;">
        <!-- 이벤트 제목 입력 -->
        <div class="font-bold text-center mb-4 event-title">
          이벤트 제목 입력
        </div>
        <input type="text" v-model="eventTitle" class="event-input">
  
        <!-- HTML 코드 입력과 미리보기 -->
        <div class="flex mt-4">
          <!-- HTML 코드 입력 -->
          <div class="w-1/2 pr-2">
            <div class="font-bold text-center mb-4">
              HTML 코드 입력
            </div>
            <textarea v-model="htmlCode" class="html-input"></textarea>
          </div>
          
          <!-- 페이지 미리보기 -->
          <div class="w-1/2 pl-2 preview-container">
            <div class="font-bold text-center mb-4">
              미리보기
            </div>
            <iframe :srcdoc="htmlCode" class="preview"></iframe>
          </div>
        </div>

        <div class="text-center mt-8">
            <button @click="saveEvent" class="save-button">
              저장
            </button>
          </div>
      </div>
      
      <!-- 저장 버튼 -->
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        eventTitle: '',
        htmlCode: '',
      };
    },
    methods: {
      saveEvent() {
        // 여기서 이벤트를 저장하는 로직을 구현합니다.
        // 예를 들어, 서버로 HTML 코드와 제목을 전송하여 저장할 수 있습니다.
        // 이후 저장이 완료되면 사용자에게 성공 메시지를 표시할 수 있습니다.
      }
    }
  };
  </script>
  
  <style scoped>
  .event-title {
    color: #f5a742;
    font-size: 2rem;
    margin-top: 20px;
  }
  
  .event-input {
    background-color: #DDDDDD;
    height: 2rem;
    width: 80%;
    margin: 0 auto;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
  }
  
  .html-input {
    background-color: #DDDDDD;
    display: block;
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
    margin: 0 auto;

  }
  
  .preview-container {
    border-left: 1px solid #ccc;
  }
  
  .preview {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    height: 300px;
    overflow-y: auto;
  }
  
  .save-button {
    background-color: #f5a742;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 20px;
  }
  </style>
  