importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCCvpmI_b0r4wz5jaxiB4d9JEmc2MCaIYQ",
  authDomain: "catch-push.firebaseapp.com",
  projectId: "catch-push",
  storageBucket: "catch-push.appspot.com",
  messagingSenderId: "786691079751",
  appId: "1:786691079751:web:f827e022f550c46bb93b62",
  measurementId: "G-5X30Z4MRCE"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {   
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "favicon.ico"
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });