<template>
  <div class="forbidden-page">
    <div class="header">
        <div class="text">
          <h1 style="font-size: 2em; margin-bottom: 30px; "> <!-- 글자 크기 설정 -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-10 h-10 inline-block align-text-bottom"> <!-- width와 height 설정 -->
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
             접근이 거부되었습니다.
          </h1>
          <p>요청하신 페이지 접근이 거부되었습니다.</p>
          <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해주시기 바랍니다.</p>
          <div class="actions" style="margin-top: 50px;">
            <button @click="goBack">이전페이지로 이동</button>
            <button @click="redirectToHomePage">홈페이지로 이동</button> <!-- redirectToHomePage 메소드 호출 -->
          </div>
        </div>
      <div class="image-container">
        <div class="error-image-wrapper">
          <img src="@/assets/403.png" class="error-image" /> <!-- 이미지에 error-image 클래스 추가 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back();
    },
    redirectToHomePage() {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const [, payloadBase64] = accessToken.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const userRole = payload.sub.split(':')[1];
        if (userRole === 'ADMIN' || userRole === 'CS' || userRole === 'MARKETER') {
          this.$router.push({ name: 'DashBorad' }); // ADMIN, CS, MARKETER일 때 /dashBoard 페이지로 이동
        } else {
          this.$router.push({ name: 'MyPage' }); // USER일 때 /mypage 페이지로 이동
        }
      } else {
        // 로그인 페이지로 이동하거나 다른 필요한 작업 수행
      }
    }
  }
}
</script>

<style scoped>
.forbidden-page {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  max-width: 800px;
}

.text-container,
.image-container {
  flex: 1;
  text-align: center; /* 텍스트 가운데 정렬 */
}

.text-header {
  text-align: center; /* 텍스트 가운데 정렬 */
  color: #f59e0b; /* text-orange-300 색상과 일치시킴 */
}

.text {
  text-align: center; /* 텍스트 가운데 정렬 */
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.actions button,
.actions a {
  margin-right: 10px; /* 버튼 간의 간격 조절 */
  display: inline-block;
  padding: 10px 20px;
  background-color: #f59e0b; /* text-orange-300 색상과 일치시킴 */
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions button:hover,
.actions a:hover {
  background-color: #e48406; /* 호버시 색상 변경 */
}


.error-image {
  max-height: 30em;
  margin-left: 10px;
}


</style>
