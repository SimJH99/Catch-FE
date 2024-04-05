import {createRouter,createWebHistory} from 'vue-router';
import Login_User from '@/components/Login_User.vue';
import DashBorad from '@/components/views/DashBoard.vue';
import PostList from '@/components/views/PostList.vue';
import UserList from '@/components/views/UserList.vue';
import CouponList from '@/components/views/CouponList.vue';
import CouponCreate from '@/components/views/CouponCreate.vue';

const routes = [
    {path:'/' , name: 'HOME' , component: DashBorad},
    {path:'/login' , name: 'LOGIN' , component: Login_User},
    {path:'/postList' , name: 'PostList' , component: PostList},
    {path:'/userList' , name: 'UserList' , component: UserList},
    {path:'/couponList', name: 'CouponList', component: CouponList},
    {path:'/couponCreate', name: 'CouponCreate', component: CouponCreate},
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  }
  );
  export default router;