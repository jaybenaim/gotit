const admin = require('firebase-admin')

const googleApplicationCredentials = require('./messaging/gotit-cbe1b-firebase-adminsdk-9ixyg-510962a1f7.json')

admin.initializeApp({
  credential: admin.credential.cert(googleApplicationCredentials),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const messaging = admin.messaging();

module.exports = {
  messaging
}