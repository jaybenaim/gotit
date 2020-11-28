const express = require("express");
const Axios = require("axios");

require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.search

  // 2500 request a data $0.004 per after that 
  await Axios.get(`https://wordsapiv1.p.rapidapi.com/words/${query}`, {
    headers: {
      "X-Mashape-Key": "ef2cc4f6aemsh6662449ac10e580p18ae80jsn64ef0eca4c80",
    }
  }).then(({ data }) => {
    const words = {
      keywords: [],
      categories: [],
      synonyms: [],
      suggestedDescriptions: []
    }


    for (const result of data.results) {
      result.hasParts !== undefined && words.keywords.push(result.hasParts)
      result.inCategory !== undefined && words.categories.push(result.inCategory)

      if (result.synonyms !== undefined) {
        for (const synonym of result.synonyms) {
          words.synonyms.push(synonym)
        }
      }
      result.definition !== undefined && words.suggestedDescriptions.push(result.definition) /// refine this result 
    }

    res.send(words)
    // res.send(words)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
