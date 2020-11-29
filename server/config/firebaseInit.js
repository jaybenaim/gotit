const admin = require('firebase-admin')

const googleApplicationCredentials = require('./settings')

admin.initializeApp({
  credential: admin.credential.cert(googleApplicationCredentials),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const messaging = admin.messaging();

module.exports = {
  messaging
}