<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">로그인</h2>
      <form @submit.prevent="doLogin" class="w-full">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">이메일</label>
          <input v-model="email" type="email" id="email" name="email" class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-600">비밀번호</label>
          <input v-model="password" type="password" id="password" name="password" class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        <button type="submit" class="bg-black text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full">
          로그인
        </button>
        <div class="mt-4 flex w-full items-center justify-end space-x-4">
          <a href="#" class="text-sm text-gray-600 hover:underline text-left">회원가입</a>
          <span class="text-sm text-gray-600">|</span>
          <a href="#" class="text-sm text-gray-600 hover:underline">이메일 찾기</a>
          <span class="text-sm text-gray-600">|</span>
          <a @click="findPassword" class="text-sm text-gray-600 hover:underline">비밀번호 찾기</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
export default {
    data(){
        return{
            email: '',
            password: '',
            eventSource: null, // 이벤트 소스 객체
            showEmailPopup: false,
        }
    },
    methods: {
        async doLogin(){
            if (!this.email) {
              alert('이메일 주소를 입력하세요.');
              return;
            }
            if (!this.password) {
              alert('비밀번호를 입력하세요.');
              return;
            }
            try{
                const loginData = {email: this.email, password: this.password};
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/login`, loginData);
                const token = response.data.result.token;
                if(token){
                    const decoded = jwtDecode(token);
                    localStorage.setItem("email", decoded.sub);
                    localStorage.setItem("role", decoded.role);
                    localStorage.setItem("token", token);
                    console.log(decoded.role);

                    if(decoded.role == 'ROLE_OWNER') {
                      window.location.href = "/my-stores"
                    }else {
                      window.location.href = "/";
                    }
                } else{
                    console.log("200 ok but not token");
                    alert("Login Failed");
                }

            } catch(error){
                alert(error.response.data.message); 
            }
        },
        findPassword(){
          alert("응~ 못찾아~(ಠ‿↼)");
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>
