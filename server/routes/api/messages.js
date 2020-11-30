const express = require("express");
const { sendNotificationToClient } = require('../../config/notify')

require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const message = req.query.message
  const tokens = []
  const notificationData = {
    title: "New message",
    body: message
  }

  await sendNotificationToClient(tokens, notificationData).then(response => {
    res.send(response.data)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
