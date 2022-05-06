const express = require('express')
const generateUploadURL = require('../controllers/s3ImageController')
const router = express.Router()

// @desc    get secure from service to S3 bucket
router.get("/", async (req, res) => {
  const url = await generateUploadURL()
  res.send({ url })
})


module.exports = router
