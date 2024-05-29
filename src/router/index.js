import { createRouter, createWebHistory } from 'vue-router';

// Import route components
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
import EventBanner from '@/views/EventBanner.vue';
import MyEvent from '@/views/MyEvent.vue';

// Define routes
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
  { path: '/:catchAll(.*)', redirect: '/notfound' }, // Redirect all invalid paths to 404 page
  { path: '/eventCreate', name:'EventCreate',component: EventCreate},
  { path: '/eventList', name:'EventList',component:EventList},
  { path: '/eventBanner', name:'EventBanner',component:EventBanner},
  { path: '/myEvent', name:"MyEvent",component:MyEvent},
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Router navigation guard
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token');

  // Check if user is logged in and redirect to login page if accessing a page that requires authentication
  
  if (!accessToken) {
    if(to.path == '/eventBanner'){
      next();
    }
    if (to.path !== '/admin/login' && to.path !== '/') {
      next({ name: 'LoginUser' });
    } else {
      next(); // Redirect to '/admin/login' or '/' page
    }
  } else {
    // If user is logged in, check user's role and redirect if necessary
    const [, payloadBase64] = accessToken.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const userRole = payload.sub.split(':')[1];

    if (to.meta.requiresAuth && !accessToken) {
      next({ name: 'LoginAdmin' });
    } else if (to.meta.requiresAdmin && userRole === 'USER') {
      next({ name: 'UnauthorizedPage' });
    } else if (to.path === '/admin/login' && userRole === 'USER') {
      next({ name: 'UnauthorizedPage' });
    } else {
      // Update last activity time whenever accessing a page
      let lastActivityTime = new Date().getTime();
      
      const inactivityDuration = 60 * 60 * 1000; // 1 hour (in milliseconds)

      // Start a timer to check activity periodically
      setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - lastActivityTime;
      
        if (elapsedTime > inactivityDuration) {
          localStorage.clear(); // Clear all data from local storage
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          window.location.href = '/';
        }
      }, 1000); // Check every second

      // Hide header, footer, and sidebar if specified in meta
      const hideHeaderFooter = to.meta.hideHeaderFooter || false;
      if (hideHeaderFooter) {
        const appInstance = router.app;
        if (appInstance) {
          appInstance.showHeader = false; // Hide header
          appInstance.showFooter = false; // Hide footer
          appInstance.showSideBar = false; // Hide sidebar
        }
      }
      
      next();
    }
  }
});

export default router;
