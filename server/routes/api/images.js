const express = require("express");
// const { ClarifaiStub } = require('clarifai-nodejs-grpc');
// const grpc = require("@grpc/grpc-js");
const Axios = require("axios");

require("dotenv").config();

// const stub = ClarifaiStub.grpc();
// // const stub = ClarifaiStub.insecureGrpc()

// const metadata = new grpc.Metadata();
// metadata.set('Authorization', `Key ${process.env.CLARIFAI_API_KEY}`)

const router = express.Router();

router.post("/", async (req, res) => {
  const imageUrl = req.body
  const modalId = "aaa03c23b3724a16a56b629203edc62c"

  const response = await Axios.post(`https://api.clarifai.com/v2/models/${modalId}/outputs`, {
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageUrl.imgUrl
          }
        }
      }
    ],
    "model": {
      "output_info": {
        "output_config": {
          "max_concepts": 40,
          "min_value": 0.987
        }
      }
    }
  }, {
    headers: {
      'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`
    }
  })


  const concepts = response.data.outputs[0].data.concepts;

  if (concepts.length > 0) {
    const predictedConcepts = []

    for (const concept of concepts) {
      predictedConcepts.push({
        name: concept.name,
        value: concept.value
      })
    }

    res.send(predictedConcepts)
  } else {
    throw new Error("Invalid request")
  }
})
// const imageUrl = req.body
// const modalId = "aaa03c23b3724a16a56b629203edc62c"

// Axios.post(`https://api.clarifai.com/v2/models/${modalId}/outputs`, {
//   "searches": [{
//     "query": {
//       "ands": [{
//         "output": {
//           "input": {
//             "data": {
//               "image": {
//                 "url": imageUrl.imgUrl || "https://s3.amazonaws.com/samples.clarifai.com/ferrari-1.png"
//               }
//             }
//           }
//         }
//       }]
//     },
//     "min_value": 0.8
//   }]
// }, {
//   headers: {
//     'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`
//   }
// }).then(results => {
//   console.log(results.data)
//   const output = results.outputs[0];

//   const predictedConcepts = []

//   for (const concept of output.data.concepts) {
//     predictedConcepts.push({
//       name: concept.name,
//       value: concept.value
//     })
//   }
//   res.send(predictedConcepts)
//   res.send(results.data)
// }).catch(err => {
//   res.status(500).send(err)
// })

// stub.PostModelOutputs(
//   {
//     model_id: "aaa03c23b3724a16a56b629203edc62c",
//     // version_id: "{THE_MODEL_VERSION_ID}",  // This is optional. Defaults to the latest model version.

//     inputs: [
//       {
//         data: {
//           image: { url: imageUrl.imgUrl || "https://s3.amazonaws.com/samples.clarifai.com/ferrari-1.png" },
//           "min_value": 0.8
//         }
//       }
//     ],
//   },
//   metadata,
//   (err, response) => {
//     if (err) {
//       res.send(err)
//       throw new Error(err);
//     }

//     if (response.status.code !== 10000) {
//       res.send(err)

//       throw new Error("Post model outputs failed, status: " + response.status.description);
//     }

//     // Since we have one input, one output will exist here.
//     const output = response.outputs[0];

//     const predictedConcepts = []

//     for (const concept of output.data.concepts) {
//       predictedConcepts.push({
//         name: concept.name,
//         value: concept.value
//       })
//     }
//     res.send(predictedConcepts)
//   }

// );

// })

module.exports = router;
