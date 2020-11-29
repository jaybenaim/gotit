
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAqqxQff_in9_UHAETeo7kBGIiLpjjMH4U",
  authDomain: "gotit-cbe1b.firebaseapp.com",
  databaseURL: "https://gotit-cbe1b.firebaseio.com",
  projectId: "gotit-cbe1b",
  storageBucket: "gotit-cbe1b.appspot.com",
  messagingSenderId: "913552603463",
  appId: "1:913552603463:web:5ee3606befba7deb2f7462",
  measurementId: "G-TF4470ZXNL"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});