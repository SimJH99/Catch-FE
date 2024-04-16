import { createRouter, createWebHistory } from 'vue-router';
import LoginAdmin from '@/components/LoginAdmin.vue';
import DashBorad from '@/views/DashBoard.vue';
import PostList from '@/views/PostList.vue';
import UserList from '@/views/UserList.vue';
import CouponList from '@/views/CouponList.vue';
import CouponCreate from '@/views/CouponCreate.vue';
import CouponReceive from '@/views/CouponReceive.vue';
import MarketerCsCreate from '@/views/MarketerCsCreate.vue';
import AdminList from '@/views/AdminList.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
  { path: '/', name: 'LOGIN', component: LoginAdmin },
  { path: '/dashBoard', name: 'DashBorad', component: DashBorad },
  { path: '/postList', name: 'PostList', component: PostList },
  { path: '/userList', name: 'UserList', component: UserList },
  {path:'/couponList', name: 'CouponList', component: CouponList},
  {path:'/couponCreate', name: 'CouponCreate', component: CouponCreate},
  {path:'/couponReceive', name: 'CouponReceive', component: CouponReceive},
  { path:'/marketerCsCreate', name:'MarketerCsCreate', component: MarketerCsCreate},
  { path:'/adminList', name:'AdminList', component: AdminList},
  { path:'/mypage', name:'MyPage', component: MyPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token'); // 로그인 상태 확인
  if (to.name !== 'LOGIN' && !isAuthenticated) {
    // 로그인이 필요한 페이지인데 로그인되어 있지 않으면 로그인 페이지로 리디렉션
    next({ name: 'LOGIN' });
  } else {
    next(); // 그 외의 경우에는 그냥 진행
  }
});

export default router;
