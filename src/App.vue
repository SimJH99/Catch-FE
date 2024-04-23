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
import { getMessaging, onMessage } from 'firebase/messaging';

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

  mounted() {
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
      .register("/firebase-messaging-sw.js")
      .then(function (registration){
        console.log("ServiceWorker registration successful with scope: ");
        return registration;
      });
    }
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const [, payloadBase64] = accessToken.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      console.log(accessToken);
      console.log(payload.sub);
      const userRole = payload.sub.split(':')[1];
      console.log(userRole);
      if (userRole === 'ADMIN' || userRole === 'CS' || userRole === 'MARKETER') {
        this.headerComponent = 'AdminHeader';
        this.footerComponent = 'AdminFooter';
        this.showSideBar = true;
      } else {
        this.headerComponent = 'UserHeader';
        this.footerComponent = 'UserFooter';
      }
    }
  },
};
</script>

<style>
</style>
