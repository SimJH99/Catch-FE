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
import NotFound from '@/views/NotFound.vue';
import EventCreate from '@/views/eventCreate.vue';
import EventList from '@/views/EventList.vue';

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
  { path:'/mycomplaintlist', name:'MyComplaintList', component: MyComplaintList},
  { path:'/createComplaint', name:'CreateComplaint', component: CreateComplaint},
  { path: '/:complaintId/complaintDetail', name: 'ComplaintDetail', component: ComplaintDetail, props: true},
  { path: '/unauthorized', name: 'UnauthorizedPage', component: UnauthorizedPage, meta: { hideHeaderFooter: true } },
  { path: '/notfound', name: 'NotFound', component: NotFound, meta: { hideHeaderFooter: true } },
  { path: '/:catchAll(.*)', redirect: '/notfound' }, // 모든 잘못된 경로를 404 페이지로 리다이렉트
  { path: '/eventCreate', name:'EventCreate',component: EventCreate},
  { path: '/eventList', name:'EventList',component:EventList}
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
    } else if (to.meta.requiresAdmin && userRole == 'USER') {
      next({ name: 'UnauthorizedPage' });
    } else if (to.path === '/admin/login' && userRole === 'USER') {
      // 사용자가 USER 권한으로 '/admin/login' 페이지에 접속하는 경우
      next({ name: 'UnauthorizedPage' });
    } else {
      const hideHeaderFooter = to.meta.hideHeaderFooter || false;

      if (hideHeaderFooter) {
        // App.vue에서 사용하는 데이터를 변경하여 헤더, 푸터, 사이드바를 숨깁니다.
        // 이 예제에서는 Vuex를 사용하여 상태를 변경하거나, 
        // Vue 컴포넌트에 직접 접근하여 데이터를 변경할 수 있습니다.
        // 이 예제에서는 Vuex를 사용하지 않고, App.vue의 data에 직접 접근하는 방법을 보여드리겠습니다.
        const appInstance = router.app;
        if (appInstance) {
          appInstance.showHeader = false; // 헤더 숨기기
          appInstance.showFooter = false; // 푸터 숨기기
          appInstance.showSideBar = false; // 사이드바 숨기기
        }
      }
      next();
    }
  }
});


export default router;
