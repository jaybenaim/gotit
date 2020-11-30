import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";


var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.analytics();

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const messaging = firebase.messaging();

messaging.getToken({ vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY })
// const messaging = firebase.messaging();

// export const requestFirebaseNotificationPermission = () =>
//   new Promise((resolve, reject) => {
//     messaging
//       .requestPermission()
//       .then(() => messaging.getToken())
//       .then((firebaseToken) => {
//         resolve(firebaseToken);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });

const onMessageListener = () => new Promise((resolve) => {
  messaging.onMessage((payload) => {
    console.log("message recieved")

    resolve(payload);
  });
});


export {
  storage,
  auth,
  firestore,
  messaging,
  onMessageListener
};
