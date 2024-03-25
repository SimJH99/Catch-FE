import {createRouter,createWebHistory} from 'vue-router';
import HomeTest from '@/components/HomeTest.vue';
import Login_User from '@/components/Login_User.vue';


const routes = [
    {path:'/' , name: 'HOME' , component: HomeTest},
    {path:'/login' , name: 'LOGIN' , component: Login_User},
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  }
  );
  export default router;