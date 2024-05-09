<template>
  <div class="container">
    <div class="m-3 p-1 rounded-md shadow-md flex bg bg-white">
      <div class="text-4xl font-bold p-3">캠페인 등록 </div>
    </div>

    <div class="m-3 p-1 bg-white rounded-md shadow-md">
      <table style="width: calc(100% - 20px); margin: 10px">
        <tbody>
          <tr>
            <th class="p-2 border-2 border-orange-400 text-xl text-center"
              style="background-color: #F5A742; width: 20%; color: white;">캠페인 제목</th>
            <td class="px-2 border-2 border-gray-300" style="width: 80%;">
              <input type="text" v-model="eventTitle"
                class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200" maxlength="40">
            </td>
          </tr>
          <tr>
            <th class="p-2 border-2 border-orange-400 text-xl text-center"
              style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
            <td class="px-2 border-2 border-gray-300" style="width: 80%;">
              <input type="date" id="startDate" v-model="startDate" class="m-1 p-1 rounded-md w-48 outline-none">
            </td>
          </tr>
          <tr>
            <th class="p-2 border-2 border-orange-400 text-xl text-center"
              style="background-color: #F5A742; width: 20%; color: white;">종료일</th>
            <td class="px-2 border-2 border-gray-300" style="width: 80%;">
              <input type="date" id="endDate" v-model="endDate" class="m-1 p-1 rounded-md w-48 outline-none ">
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mb-4 bg-white w-full p-3">
        <!-- 캠페인 제목 입력 -->

        <!-- HTML 코드 입력과 미리보기 -->
        <div class="flex mt-4">
          <!-- HTML 코드 입력 -->
          <div class="w-1/2 pr-2">
            <div class="font-bold mb-4 text-xl">HTML 코드 입력</div>
            <textarea v-model="htmlCode" class="html-input outline-none bg-white"></textarea>
          </div>

          <!-- 페이지 미리보기 -->
          <div class="w-1/2 pl-2 preview-container">
            <div class="font-bold mb-4 text-xl">미리보기</div>
            <iframe :srcdoc="htmlCode" class="preview"></iframe>
          </div>
        </div>

        <div class="text-end mt-8">
          <button @click="saveEvent"
            class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]">
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";

export default {
  data() {
    return {
      eventTitle: '',
      htmlCode: '',
      startDate: '',
      endDate: '',
    };
  },
  methods: {
    async saveEvent() {
      try {
        // 제목이 공백인지 검사
        if (!this.eventTitle.trim()) {
          alert('캠페인 제목을 입력해주세요.');
          return;
        }
        // 내용이 공백인지 검사
        if (!this.htmlCode.trim()) {
          alert('캠페인 내용을 입력해주세요.');
          return;
        }
        if (!this.startDate.trim()) {
          alert('시작일을 지정해주세요.');
          return;
        }
        if (!this.endDate.trim()) {
          alert('종료일을 지정해주세요.');
          return;
        }
        if (!/\[광고\]/.test(this.eventTitle)) {
          alert('캠페인 제목에 "[광고]"를 포함해주세요.');
          return;
        }
        // 현재 날짜 가져오기
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);

        // 시작일이 현재 날짜 이전인지 검사
        if (new Date(this.startDate) < currentDate) {
          alert('시작일은 현재 날짜 이후여야 합니다.');
          return;
        }
        // 종료일이 현재 날짜 이전인지 검사
        if (new Date(this.endDate) < currentDate) {
          alert('종료일은 현재 날짜 이후여야 합니다.');
          return;
        }
        // 시작일이 종료일보다 이른지 검사
        if (new Date(this.startDate) > new Date(this.endDate)) {
          alert('시작일은 종료일보다 이전이어야 합니다.');
          return;
        }

        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/event/create`, {
          name: this.eventTitle,
          contents: this.htmlCode,
          startDate: this.startDate,
          endDate: this.endDate,
        }, { headers });

        alert('캠페인을 성공적으로 저장되었습니다.');
        this.$router.push("/eventList");
      } catch (error) {
        console.error(error);
        alert('캠페인 저장 중 오류가 발생했습니다.');
      }
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
  background-color: white;
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