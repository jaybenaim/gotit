const express = require("express");
const Axios = require("axios");
const { isValid } = require("../../helpers/isValid");

require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.search

  // 2500 request a day $0.004 per after that 
  await Axios.get(`https://wordsapiv1.p.rapidapi.com/words/${query}`, {
    headers: {
      "X-Mashape-Key": process.env.RAPID_API_KEY,
    }
  }).then(({ data }) => {
    const words = {
      keywords: [],
      categories: [],
      synonyms: [],
      suggestedDescriptions: []
    }

    for (const result of data.results) {
      if (result.hasParts !== undefined) {
        for (const keyword of result.hasParts) {
          if (isValid(keyword)) {
            words.keywords.push(keyword)
          }
        }
      }

      if (result.inCategory !== undefined) {
        for (const category of result.inCategory) {
          if (category !== undefined) {
            if (isValid(category)) {
              words.categories.push(category)
            }
          }
        }
      }

      if (result.synonyms !== undefined) {
        for (const synonym of result.synonyms) {
          if (isValid(synonym)) {
            words.synonyms.push(synonym)
          }
        }
      }

      result.definition !== undefined && isValid(result.definition) && words.suggestedDescriptions.push(result.definition) /// refine this result 
    }

    res.send(words)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
