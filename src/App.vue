<template>
  <div>
    <div class="bg-gray-100">
      <AppHeader v-if="showHeader"></AppHeader>
      <div class="flex w-auto">
        <AppSideBar v-if="isChecked && !isLoginPage" class="min-w-[250px] w-1/6 h-auto"></AppSideBar>
        <router-view class="w-5/6 min-h-[800px]"/>
      </div>
    </div>
    <AppFooter v-if="isChecked && !isLoginPage"></AppFooter>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppSideBar from "@/components/AppSideBar.vue";
import AppHeader from "@/components/AppHeader.vue";

// import firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

export default {
  data() {
    return {
      isChecked: true,
      isLoginPage: false,
    };
  },

  components: {
    AppFooter,
    AppSideBar,
    AppHeader,
  },

  computed: {
    showHeader() {
      // 헤더가 표시되어야 하는지 여부 확인
      return this.isChecked && !this.isLoginPage;
    },
  },

  mounted() {
    // 로컬 스토리지에서 access_token 가져오기
    const accessToken = localStorage.getItem("access_token");

    // access_token이 없는 경우 (로그인 되어 있지 않은 경우)
    if (!accessToken) {
      this.isChecked = false;
      this.isLoginPage = true;
    }

    const firebaseConfig = {
      apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
      authDomain: `${process.env.VUE_APP_FIREBASE_AUTH_DOMAIN}`,
      projectId: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}`,
      storageBucket: `${process.env.VUE_APP_FIREBASE_STORAGE_BUCKET}`,
      messagingSenderId: `${process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID}`,
      appId: `${process.env.VUE_APP_FIREBASE_APP_ID}`,
      measurementId: `${process.env.VUE_APP_FIREBASE_MEASUREMENTID}`
    }

    const firebase = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebase);

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      if (Notification.permission === "granted") {
        const { title, body } = payload.notification;
        navigator.serviceWorker.ready
          .then((registration) => {
            registration
              .showNotification(title, {
                body: body,
                icon: "favicon.ico",
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: "vibration-sample",
              })
              .finally((arg) => console.log(arg));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    if("serviceWorker" in navigator){
      navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .then(function (registration){
        console.log("ServiceWorker registration successful with scope: ");
        return registration;
      });
    }
  },
};
</script>

<style>
</style>
