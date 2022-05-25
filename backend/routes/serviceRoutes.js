const express = require("express");
const webpush = require("web-push");
const router = express.Router();

// subscribe service worker route
router.post("/subscribe", (req, res) => {
  // get subscription object
  const { subscription, title, message } = req.body;

  // send 201 - resource created
  // res.status(201).json({});

  // create payload
  const payload = JSON.stringify({ title, message });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err, "<< ERROR"));

  // console.log("<< SUCCESS TRUE")

  res.status(200).json({ success: "true" });
});

module.exports = router
