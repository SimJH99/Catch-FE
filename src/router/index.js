import { createRouter, createWebHistory } from 'vue-router';
import LoginAdmin from '@/views/LoginAdmin.vue';
import DashBorad from '@/views/DashBoard.vue';
import ComplaintList from '@/views/ComplaintList.vue';
import ComplaintDetail from '@/views/ComplaintDetail.vue';
import UserList from '@/views/UserList.vue';
import CouponList from '@/views/CouponList.vue';
import CouponCreate from '@/views/CouponCreate.vue';
import CouponReceive from '@/views/CouponReceive.vue';
import MarketerCsCreate from '@/views/MarketerCsCreate.vue';
import AdminList from '@/views/AdminList.vue';
import MyPage from '@/views/MyPage.vue';
import LoginUser from '@/views/LoginUser.vue';
import UnauthorizedPage from '@/views/UnauthorizedPage.vue';
import MyComplaintList from '@/views/MyComplaintList.vue';
import CreateComplaint from '@/views/CreateComplaint.vue';

const routes = [
  { path: '/admin/login', name: 'LoginAdmin', component: LoginAdmin },
  { path: '/dashBoard', name: 'DashBorad', component: DashBorad, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/complaintList', name: 'ComplaintList', component: ComplaintList, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/complaintDetail', name: 'ComplaintDetail', component: ComplaintDetail, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/userList', name: 'UserList', component: UserList, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/couponList', name: 'CouponList', component: CouponList, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/couponCreate', name: 'CouponCreate', component: CouponCreate, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/couponReceive', name: 'CouponReceive', component: CouponReceive, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/marketerCsCreate', name: 'MarketerCsCreate', component: MarketerCsCreate, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/adminList', name: 'AdminList', component: AdminList, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/mypage', name: 'MyPage', component: MyPage, meta: { requiresAuth: true } },
  { path: '/', name: 'LoginUser', component: LoginUser },
  { path: '/unauthorized', name: 'UnauthorizedPage', component: UnauthorizedPage },
  { path:'/mycomplaintlist', name:'MyComplaintList', component: MyComplaintList},
  { path:'/createComplaint', name:'CreateComplaint', component: CreateComplaint},
  { path: '/:complaintId/complaintDetail', name: 'ComplaintDetail', component: ComplaintDetail, props: true},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    if (to.path !== '/admin/login' && to.path !== '/') {
      // 사용자 로그인 페이지 또는 '/'로 접근하는 경우
      next({ name: 'LoginUser' });
    } else {
      next(); // '/admin/login' 또는 '/' 페이지로 이동
    }
  } else {
    const [, payloadBase64] = accessToken.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const userRole = payload.sub.split(':')[1];

    if (to.meta.requiresAuth && !accessToken) {
      next({ name: 'LoginAdmin' });
    } else if (to.meta.requiresAdmin && userRole !== 'ADMIN') {
      next({ name: 'UnauthorizedPage' });
    } else if (to.path === '/admin/login' && userRole === 'USER') {
      // 사용자가 USER 권한으로 '/admin/login' 페이지에 접속하는 경우
      next({ name: 'UnauthorizedPage' });
    } else {
      next();
    }
  }
});

export default router;
