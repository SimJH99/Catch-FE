<!-- App.vue -->
<template>
  <div>
    <div class="bg-gray-100">
      <component :is="headerComponent"></component>
      <div class="flex w-auto">
        <AppSideBar v-if="showSideBar" class="min-w-[250px] w-1/6 h-auto font-"></AppSideBar>
        <router-view class="w-full min-h-[800px]"/>
      </div>
    </div>
    <component :is="footerComponent"></component>
  </div>
</template>
<script>
import AppSideBar from "@/components/AppSideBar.vue";
import UserHeader from "@/components/UserHeader.vue"
import UserFooter from "./components/UserFooter.vue";
import AdminHeader from "./components/AdminHeader.vue";
import AdminFooter from "./components/AdminFooter.vue";
// import firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from "axios";
export default {
  data() {
    return {
      headerComponent: null,
      footerComponent: null,
      showSideBar: false
    };
  },
  components: {
    AppSideBar,
    UserHeader,
    UserFooter,
    AdminHeader,
    AdminFooter
  },
  watch: {
    $route(to) {
      this.updateLayout(to);
    }
  },
  async mounted() {
    await this.initializeFCM();
    this.updateLayout(this.$route);
  },
  methods: {
    async initializeFCM() {
      const firebaseConfig = {
        apiKey: "AIzaSyCCvpmI_b0r4wz5jaxiB4d9JEmc2MCaIYQ",
        authDomain: "catch-push.firebaseapp.com",
        projectId: "catch-push",
        storageBucket: "catch-push.appspot.com",
        messagingSenderId: "786691079751",
        appId: "1:786691079751:web:f827e022f550c46bb93b62",
        measurementId: "G-5X30Z4MRCE"
      };
      // Initialize Firebase
      const firebase = initializeApp(firebaseConfig);
      const messaging = getMessaging(firebase);
      if (!localStorage.getItem("fcmToken")) {
        try {
          // Await the FCM token
          const token = await getToken(messaging, {
            vapidKey: `${process.env.VUE_APP_FIREBASE_VAP_ID}`
          });
          const access_token = localStorage.getItem('access_token');
          const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
          // Send the FCM token to the server
          await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/user/pushToken`,
            {
              pushToken: token,
            },
            { headers }
          );
          // Store the token in local storage
          localStorage.setItem("fcmToken", token);
          console.log('fcmToken: ', token);
        } catch (err) {
          console.log(err);
        }
      }
      onMessage(messaging, (payload) => {
        console.log("Received message ", payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: "favicon.ico"
        };

        if (Notification.permission === "granted") {
            new Notification(notificationTitle, notificationOptions);
        }
    });
    },
    updateLayout(route) {
      const meta = route.meta || {};
      const hideHeaderFooter = meta.hideHeaderFooter || false;
      if (hideHeaderFooter) {
        this.headerComponent = null; // 헤더 숨기기
        this.footerComponent = null; // 푸터 숨기기
        this.showSideBar = false; // 사이드바 숨기기
      } else {
        // 헤더, 푸터, 사이드바를 역할에 따라 설정
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const [, payloadBase64] = accessToken.split('.');
          const payload = JSON.parse(atob(payloadBase64));
          const userRole = payload.sub.split(':')[1];
          if (userRole === 'ADMIN' || userRole === 'CS' || userRole ==='MARKETER') {
            this.headerComponent = 'AdminHeader';
            this.footerComponent = 'AdminFooter';
            this.showSideBar = true;
          } else {
            this.headerComponent = 'UserHeader';
            this.footerComponent = 'UserFooter';
          }
        }
      }
    }
  }
};
</script>
<style>
</style>