const express = require("express");
const Axios = require("axios");

require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.search

  await Axios.get(`https://api.datamuse.com/sug?s=${query}`).then(results => {
    const words = []

    for (const result of results.data) {
      if (result.score > 992) {
        words.push(result)
      }
    }

    res.send(words)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
