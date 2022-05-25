const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const colors = require("colors");
const webpush = require("web-push");
// const cors = require("cors")
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

webpush.setVapidDetails(
  'mailto:test@test.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
)

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"))

app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/s3-image", require("./routes/s3ImageRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
} else {
  app.get("/", (req, res) => res.send("Development mode"));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
