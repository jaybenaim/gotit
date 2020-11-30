const express = require("express");
const { sendNotificationToClient } = require('../../config/notify')

require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const title = req.body.title
    const message = req.body.message

    const tokens = [
      req.body.token
    ]

    const notificationData = {
      title: title,
      body: message
    }

    console.log(tokens, notificationData)
    sendNotificationToClient(tokens, notificationData)
    res.send({ message: notificationData })
  } catch {
    res.send({ error: "Notification failed" })
  }

})

module.exports = router;
