const express = require("express");
const Axios = require("axios");

require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { imgUrl, minValue = 0.97, limit = 40 } = req.body
  const modalId = "aaa03c23b3724a16a56b629203edc62c"

  const response = await Axios.post(`https://api.clarifai.com/v2/models/${modalId}/outputs`, {
    "inputs": [
      {
        "data": {
          "image": {
            "url": imgUrl
          }
        }
      }
    ],
    "model": {
      "output_info": {
        "output_config": {
          "max_concepts": limit,
          "min_value": minValue
        }
      }
    }
  }, {
    headers: {
      'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`
    }
  }).catch(err => {
    console.log(err)
    res.send(err)
  })

  const concepts = response.data.outputs[0].data.concepts;

  if (concepts.length > 0) {
    const predictedConcepts = []

    for (const concept of concepts) {
      if (concept.name !== "no person") {
        predictedConcepts.push({
          name: concept.name,
          value: concept.value
        })
      }
    }

    res.send(predictedConcepts)
  } else {
    res.send({ Error: "No results" })
    throw new Error("Invalid request")
  }
})

module.exports = router;
